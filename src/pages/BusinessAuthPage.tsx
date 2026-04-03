import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2, Check, Phone, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n';

export default function BusinessAuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [binIin, setBinIin] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState<'broker' | 'business'>('business');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, user, loading: authLoading } = useAuth();
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
      if (!companyName.trim() || !contactPerson.trim()) { setError(t.auth.enterName); return; }
      if (password !== confirmPassword) { setError(t.auth.passwordMismatch); return; }
    }

    setLoading(true);
    if (mode === 'login') {
      const res = await signIn(email, password);
      if (res.error) setError(res.error);
      else toast.success(t.auth.welcome);
    } else {
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: contactPerson, company_name: companyName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) { setError(signUpError.message); setLoading(false); return; }
        if (data.user) {
          // Update profile with account_type (trigger already created it)
          await supabase.from('profiles')
            .update({
              display_name: contactPerson,
              phone: phone.trim() || null,
              account_type: accountType,
            })
            .eq('user_id', data.user.id);
          // Assign broker/business role (trigger already added 'user')
          await supabase.from('user_roles').insert({
            user_id: data.user.id,
            role: accountType as any,
          });
        }
        setSuccess(t.auth.registrationSuccess);
        toast.success(t.auth.accountCreated);
      } catch {
        setError(t.auth.serverError);
      }
    }
    setLoading(false);
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
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <motion.div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md mx-4">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-card/60 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="absolute inset-[1px] rounded-3xl border border-white/15" />

          <div className="relative p-8 sm:p-10">
            <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                <img src="/logo1.png" alt="Agrosauda" className="w-11 h-11 rounded-xl shadow-lg shadow-primary/30 object-contain" />
                <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                  Agro<span className="text-primary">sauda</span>
                </span>
              </Link>

              <div className="flex items-center justify-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-display font-bold text-foreground">{t.businessAuth.title}</h1>
              </div>
              <p className="text-sm text-muted-foreground">{t.businessAuth.subtitle}</p>
            </motion.div>

            {/* Mode Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === 'login' ? 'bg-primary text-primary-foreground' : 'bg-accent/50 text-muted-foreground hover:text-foreground'}`}
              >
                {t.businessAuth.loginTitle}
              </button>
              <button
                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === 'register' ? 'bg-primary text-primary-foreground' : 'bg-accent/50 text-muted-foreground hover:text-foreground'}`}
              >
                {t.businessAuth.registerTitle}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === 'register' && (
                  <motion.div key="biz-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <div className="space-y-4 mb-4">
                      {/* Account type */}
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setAccountType('business')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${accountType === 'business' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 text-muted-foreground hover:border-primary/30'}`}
                        >
                          <Building2 className="w-4 h-4" /> {t.businessAuth.business}
                        </button>
                        <button type="button" onClick={() => setAccountType('broker')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${accountType === 'broker' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 text-muted-foreground hover:border-primary/30'}`}
                        >
                          <Briefcase className="w-4 h-4" /> {t.businessAuth.broker}
                        </button>
                      </div>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder={t.businessAuth.companyName} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50" />
                      </div>
                      <Input value={binIin} onChange={e => setBinIin(e.target.value)} placeholder={t.businessAuth.binIin} className="h-12 rounded-xl bg-background/50 border-border/50" />
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input value={contactPerson} onChange={e => setContactPerson(e.target.value)} placeholder={t.businessAuth.contactPerson} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50" />
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.auth.phonePlaceholder} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.auth.email} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50" required />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={t.auth.password} className="pl-10 pr-10 h-12 rounded-xl bg-background/50 border-border/50" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {mode === 'register' && (
                  <motion.div key="confirm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={t.auth.confirmPassword} className="pl-10 h-12 rounded-xl bg-background/50 border-border/50" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-destructive text-center bg-destructive/10 rounded-lg py-2 px-3">{error}</motion.p>}
                {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-primary text-center bg-primary/10 rounded-lg py-2 px-3"><Check className="w-4 h-4 shrink-0" />{success}</motion.div>}
              </AnimatePresence>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all group">
                {loading ? <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" /> : (
                  <span className="flex items-center gap-2">
                    {mode === 'login' ? t.auth.loginBtn : t.auth.registerBtn}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                ← {t.businessAuth.backToMain}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
