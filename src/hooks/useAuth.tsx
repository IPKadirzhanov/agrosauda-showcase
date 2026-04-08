import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  userRole: string | null;
}

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  preferred_language: string | null;
  account_type: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const authRequestVersionRef = useRef(0);

  const resetAuthState = () => {
    setSession(null);
    setUser(null);
    setProfile(null);
    setUserRole(null);
  };

  const clearStoredAuth = () => {
    if (typeof window === 'undefined') return;

    [window.localStorage, window.sessionStorage].forEach((storage) => {
      Object.keys(storage).forEach((key) => {
        if (key.startsWith('sb-') && (key.includes('auth-token') || key.includes('code-verifier'))) {
          storage.removeItem(key);
        }
      });
    });
  };

  const fetchProfile = async (userId: string, requestVersion = authRequestVersionRef.current) => {
    let { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    // Auto-create profile for OAuth users if trigger didn't fire
    if (!data) {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const displayName = authUser.user_metadata?.display_name 
          || authUser.user_metadata?.full_name 
          || authUser.user_metadata?.name 
          || authUser.email?.split('@')[0] || '';
        const avatarUrl = authUser.user_metadata?.avatar_url || null;
        
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({ user_id: userId, display_name: displayName, avatar_url: avatarUrl })
          .select()
          .single();
        data = newProfile;
      }
    }
    if (requestVersion !== authRequestVersionRef.current) return;
    setProfile(data as UserProfile | null);
  };

  const fetchRole = async (userId: string, requestVersion = authRequestVersionRef.current) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (requestVersion !== authRequestVersionRef.current) return;
    
    if (data && data.length > 0) {
      const roles = data.map(r => r.role);
      // Prioritize: admin > broker > business > user
      if (roles.includes('admin')) setUserRole('admin');
      else if (roles.includes('broker')) setUserRole('broker');
      else if (roles.includes('business')) setUserRole('business');
      else setUserRole(roles[0] || 'user');
    } else {
      setUserRole('user');
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const requestVersion = authRequestVersionRef.current;
      await fetchProfile(user.id, requestVersion);
      await fetchRole(user.id, requestVersion);
    }
  };

  useEffect(() => {
    let initialSessionHandled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const requestVersion = ++authRequestVersionRef.current;

      if (session?.user) {
        setSession(session);
        setUser(session.user);
        // Use setTimeout to avoid Supabase deadlock on auth calls inside callback
        setTimeout(async () => {
          if (requestVersion !== authRequestVersionRef.current) return;
          await Promise.all([
            fetchProfile(session.user.id, requestVersion),
            fetchRole(session.user.id, requestVersion),
          ]);
          if (requestVersion === authRequestVersionRef.current) {
            setLoading(false);
          }
        }, 0);
      } else {
        resetAuthState();
        setLoading(false);
      }

      initialSessionHandled = true;
    });

    // Fallback: if onAuthStateChange doesn't fire quickly, load session manually
    const fallbackTimer = setTimeout(async () => {
      if (initialSessionHandled) return;
      const { data: { session } } = await supabase.auth.getSession();
      const requestVersion = ++authRequestVersionRef.current;
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        await Promise.all([
          fetchProfile(session.user.id, requestVersion),
          fetchRole(session.user.id, requestVersion),
        ]);
      } else {
        resetAuthState();
      }
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) return { error: error.message };
      if (data.user) {
        await supabase.from('profiles').insert({
          user_id: data.user.id,
          display_name: name,
        });
      }
      return {};
    } catch {
      return { error: 'Ошибка подключения к серверу' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return {};
    } catch {
      return { error: 'Ошибка подключения к серверу' };
    }
  };

  const signOut = async () => {
    authRequestVersionRef.current += 1;
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error && error.name !== 'AuthSessionMissingError') {
        console.error('Sign out error:', error);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      clearStoredAuth();
      resetAuthState();
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut, profile, refreshProfile, userRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
