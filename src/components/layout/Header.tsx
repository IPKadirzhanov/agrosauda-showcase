import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react';

const navLinks = [
  { name: 'Главная', path: '/' },
  { name: 'Маркетплейс', path: '/marketplace' },
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-header shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-main flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Agro<span className="text-primary">sauda</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/favorites" className="p-2.5 rounded-xl hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
            <Heart className="w-5 h-5" />
          </Link>
          <Link
            to="/sell"
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Продать товар
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-header border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Link to="/favorites" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors">
                  <Heart className="w-4 h-4" /> Избранное
                </Link>
                <Link to="/sell" className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold text-center hover:opacity-90 transition-opacity">
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
