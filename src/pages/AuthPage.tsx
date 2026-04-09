import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Check, Phone, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n';


export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!authLoading && user) navigate('/dashboard', { replace: true });
  }, [user, authLoading, navigate]);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) { setError(t.auth.invalidEmail); return; }
    if (password.length < 6) { setError(t.auth.shortPassword); return; }
    if (mode === 'register') {
      if (!name.trim()) { setError(t.auth.enterName); return; }
      if (password !== confirmPassword) { setError(t.auth.passwordMismatch); return; }
    }

    setLoading(true);
    if (mode === 'login') {
      const res = await signIn(email, password);
      if (res.error) setError(res.error);
      else toast.success(t.auth.welcome);
    } else {
      const res = await signUp(email, password, name);
      if (res.error) setError(res.error);
      else {
        // Save phone if provided
        if (phone.trim()) {
          const { data: { user: newUser } } = await supabase.auth.getUser();
          if (newUser) {
            await supabase.from('profiles').update({ phone: phone.trim() }).eq('user_id', newUser.id);
          }
        }
        setSuccess(t.auth.registrationSuccess);
        toast.success(t.auth.accountCreated);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });

      if (result.error) {
        setError(result.error instanceof Error ? result.error.message : String(result.error));
        setLoading(false);
        return;
      }

      if (result.redirected) {
        return;
      }

      // Session set automatically, navigate
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(t.auth.serverError);
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[100px]"
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/15 blur-[80px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md mx-4"
      >
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-card/60 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="absolute inset-[1px] rounded-3xl border border-white/15" />

          <div className="relative p-8 sm:p-10">
            {/* Logo */}
            <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                <img src="/logo1.png" alt="Agrosauda" className="w-11 h-11 rounded-xl shadow-lg shadow-primary/30 object-contain" />
                <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                  Agro<span className="text-primary">sauda</span>
                </span>
              </Link>

              <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mode === 'login' ? t.auth.loginSubtitle : t.auth.registerSubtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 rounded-xl mb-4 gap-3 text-sm font-medium border-border/50 hover:bg-accent/50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t.auth.googleLogin}
            </Button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/30" /></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-card/60 text-muted-foreground">или</span></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === 'register' && (
                  <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <div className="relative group mb-4">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input value={name} onChange={e => setName(e.target.value)} placeholder={t.auth.name} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.auth.email} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300" required />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={t.auth.password} className="pl-10 pr-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {mode === 'register' && (
                  <motion.div key="extra" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <div className="space-y-4">
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={t.auth.confirmPassword} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300" />
                      </div>
                      <PhoneInput value={phone} onChange={setPhone} placeholder={t.auth.phonePlaceholder} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error / Success */}
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-destructive text-center bg-destructive/10 rounded-lg py-2 px-3">
                    {error}
                  </motion.p>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-primary text-center bg-primary/10 rounded-lg py-2 px-3">
                    <Check className="w-4 h-4 shrink-0" />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 group">
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                ) : (
                  <span className="flex items-center gap-2">
                    {mode === 'login' ? t.auth.loginBtn : t.auth.registerBtn}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            {/* Switch mode */}
            <div className="mt-6 text-center">
              <button onClick={switchMode} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}
              </button>
            </div>

            {/* Business link */}
            <div className="mt-4 text-center">
              <Link to="/auth/business" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300">
                {t.auth.businessLink}
              </Link>
            </div>

            <div className="absolute top-4 right-4">
              <Sparkles className="w-5 h-5 text-primary/30" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
