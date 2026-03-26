import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Маркетплейс', path: '/marketplace' },
  { name: 'Agro Shop', path: '/agro-shop' },
  { name: 'Объявления', path: '/classifieds' },
  { name: 'Безопасная сделка', path: '/safe-deal' },
  { name: 'Субсидии', path: '/subsidies' },
  { name: 'AI Ассистенты', path: '/ai-assistants' },
  { name: 'Обучение', path: '/education' },
  { name: 'Новости', path: '/news' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const showTransparent = isHome && !scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      showTransparent
        ? 'bg-transparent'
        : 'glass-header shadow-sm'
    }`}>
      <div className="container-main flex items-center justify-between h-[72px] px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg group-hover:scale-105 transition-transform duration-300 shadow-md">
            A
          </div>
          <span className={`font-display font-bold text-[22px] tracking-tight transition-colors duration-300 ${
            showTransparent ? 'text-white' : 'text-foreground'
          }`}>
            Agro<span className="text-primary">sauda</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-primary bg-primary/8'
                  : showTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/favorites" className={`p-2.5 rounded-xl transition-all duration-300 ${
            showTransparent
              ? 'text-white/70 hover:text-white hover:bg-white/10'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}>
            <Heart className="w-[18px] h-[18px]" />
          </Link>
          <Link
            to="/sell"
            className="btn-premium !px-6 !py-2.5 !rounded-xl !text-sm"
          >
            Продать товар
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
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
            className="lg:hidden glass-header border-t border-border/50 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-0.5">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                <Link to="/favorites" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-all duration-300">
                  <Heart className="w-4 h-4" /> Избранное
                </Link>
                <Link to="/sell" className="flex-1 btn-premium !py-3 !rounded-xl !text-sm text-center">
                  Продать
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
