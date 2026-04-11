import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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

async function loadProfile(userId: string): Promise<UserProfile | null> {
  let { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

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
  return data as UserProfile | null;
}

async function loadRole(userId: string): Promise<string> {
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (data && data.length > 0) {
    const roles = data.map(r => r.role);
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('broker')) return 'broker';
    if (roles.includes('business')) return 'business';
    return roles[0] || 'user';
  }
  return 'user';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const loadUserData = useCallback(async (currentUser: User) => {
    const [p, r] = await Promise.all([
      loadProfile(currentUser.id),
      loadRole(currentUser.id),
    ]);
    return { profile: p, role: r };
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Step 1: Restore session from storage
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (cancelled) return;
      if (s?.user) {
        setSession(s);
        setUser(s.user);
        const { profile: p, role: r } = await loadUserData(s.user);
        if (cancelled) return;
        setProfile(p);
        setUserRole(r);
      }
      setLoading(false);
      setInitialized(true);
    });

    // Step 2: Listen for subsequent changes (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, s) => {
        // Skip initial session if we already handled it
        if (!initialized && event === 'INITIAL_SESSION') return;

        if (s?.user) {
          setSession(s);
          setUser(s.user);
          // Non-blocking fetch for profile/role on auth changes
          loadUserData(s.user).then(({ profile: p, role: r }) => {
            if (cancelled) return;
            setProfile(p);
            setUserRole(r);
          });
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshProfile = useCallback(async () => {
    if (user) {
      const { profile: p, role: r } = await loadUserData(user);
      setProfile(p);
      setUserRole(r);
    }
  }, [user, loadUserData]);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
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
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return {};
    } catch {
      return { error: 'Ошибка подключения к серверу' };
    }
  }, []);

  const signOut = useCallback(async () => {
    // Reset state immediately to unblock UI
    setSession(null);
    setUser(null);
    setProfile(null);
    setUserRole(null);

    // Clear stored tokens
    try {
      [window.localStorage, window.sessionStorage].forEach((storage) => {
        Object.keys(storage).forEach((key) => {
          if (key.startsWith('sb-') && (key.includes('auth-token') || key.includes('code-verifier'))) {
            storage.removeItem(key);
          }
        });
      });
    } catch {}

    // Fire-and-forget the actual sign out call
    supabase.auth.signOut({ scope: 'local' }).catch(() => {});
  }, []);

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
