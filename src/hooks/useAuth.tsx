import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  const fetchProfile = async (userId: string) => {
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
    setProfile(data as UserProfile | null);
  };

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();
    setUserRole(data?.role || 'user');
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
      await fetchRole(user.id);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
          fetchRole(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
        await fetchRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
    await supabase.auth.signOut();
    setProfile(null);
    setUserRole(null);
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
