import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, LogOut, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage, languages } from '@/i18n';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user, profile, signOut, userRole } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t.nav.agroShop, path: '/agro-shop' },
    { name: t.nav.classifieds, path: '/classifieds' },
    { name: t.nav.agroBroker, path: '/agrobroker' },
    { name: t.nav.agroShorts, path: '/agroshorts' },
    { name: t.nav.aiAssistants, path: '/ai-assistants' },
    { name: t.nav.education, path: '/education' },
    { name: t.nav.news, path: '/news' },
  ];

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      navigate('/admin');
      return;
    }
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1500);
  }, [navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isHome = location.pathname === '/';
  const showTransparent = isHome && !scrolled;
  const currentLang = languages.find(l => l.code === lang);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? 'bg-transparent'
          : 'bg-card/80 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_12px_hsl(var(--foreground)/0.04)]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={handleLogoClick}>
          <img
            src="/logo1.png"
            alt="Agrosauda"
            className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform duration-300 object-contain"
          />
          <span className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
            showTransparent ? 'text-white' : 'text-foreground'
          }`}>
            Agro<span className="text-primary">sauda</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5 mx-4">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'text-primary'
                    : showTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center gap-1.5 shrink-0">
          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                showTransparent
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-wide">{currentLang?.code}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-border bg-card shadow-lg overflow-hidden z-50"
                >
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as any); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors ${
                        lang === l.code
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground hover:bg-accent/60'
                      }`}
                    >
                      <span className="text-sm">{l.flag}</span>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/favorites"
            className={`p-2 rounded-lg transition-all duration-200 ${
              showTransparent
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Heart className="w-4 h-4" />
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  showTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                {profile?.display_name || t.nav.cabinet}
              </Link>
              <button
                onClick={async () => { await signOut(); navigate('/'); }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  showTransparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                showTransparent
                  ? 'text-white border-white/25 hover:bg-white/10'
                  : 'text-foreground border-border hover:bg-accent'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              {t.nav.login}
            </Link>
          )}

          <Link
            to="/sell"
            className="ml-1 btn-premium !px-5 !py-1.5 !rounded-lg !text-[13px] !font-semibold"
          >
            {t.nav.sell}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`xl:hidden p-2 rounded-lg transition-all duration-200 ${
            showTransparent ? 'text-white hover:bg-white/10' : 'hover:bg-accent'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-card/95 backdrop-blur-xl border-t border-border/40 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-0.5">
              {/* Mobile Language Switcher */}
              <div className="flex gap-1 mb-3 pb-3 border-b border-border/50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      lang === l.code
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent/50'
                    }`}
                  >
                    <span>{l.flag}</span> {l.label}
                  </button>
                ))}
              </div>

              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-all duration-200"
                  >
                    <User className="w-4 h-4" /> {t.nav.cabinet}
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-all duration-200"
                  >
                    <User className="w-4 h-4" /> {t.nav.login}
                  </Link>
                )}
                <Link to="/sell" className="flex-1 btn-premium !py-3 !rounded-xl !text-sm text-center">
                  {t.nav.sell}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
