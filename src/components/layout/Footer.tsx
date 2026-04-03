import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t.footer.marketplace]: [
      { name: t.footer.allProducts, path: '/marketplace' },
      { name: t.footer.tractors, path: '/marketplace?cat=tractors' },
      { name: t.footer.combines, path: '/marketplace?cat=combines' },
      { name: t.footer.seeds, path: '/marketplace?cat=seeds' },
      { name: t.footer.fertilizers, path: '/marketplace?cat=fertilizers' },
      { name: t.footer.spareParts, path: '/marketplace?cat=spare-parts' },
    ],
    [t.footer.services]: [
      { name: t.footer.safeDeal, path: '/safe-deal' },
      { name: t.footer.subsidies, path: '/subsidies' },
      { name: t.footer.aiAssistants, path: '/ai-assistants' },
      { name: t.footer.education, path: '/education' },
      { name: t.footer.sellProduct, path: '/sell' },
    ],
    [t.footer.company]: [
      { name: t.footer.aboutUs, path: '/about' },
      { name: t.footer.news, path: '/news' },
      { name: t.footer.contacts, path: '/contact' },
      { name: t.footer.privacy, path: '#' },
      { name: t.footer.terms, path: '#' },
    ],
    [t.footer.support]: [
      { name: t.footer.helpCenter, path: '/contact' },
      { name: t.footer.faq, path: '/safe-deal' },
      { name: t.footer.forSellers, path: '/sell' },
      { name: t.footer.forBuyers, path: '/safe-deal' },
    ],
  };

  return (
    <footer className="relative bg-foreground text-background/80 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo1.png" alt="Agrosauda" className="w-10 h-10 rounded-xl shadow-lg object-contain" />
              <span className="font-display font-bold text-xl text-background">Agro<span className="text-primary">sauda</span></span>
            </Link>
            <p className="text-sm text-background/50 leading-relaxed mb-5">{t.footer.description}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/5 border border-background/10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
              <p className="text-[11px] text-background/40 font-medium">
                Разработано <span className="text-primary">IPKadirzhanov</span>
              </p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-background text-sm mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-background/40 hover:text-primary transition-colors duration-300">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-background/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30 text-center sm:text-left">
            © {new Date().getFullYear()} Agrosauda. {t.footer.rights}. Проект IPKadirzhanov. {t.footer.country}.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-background/25">🇰🇿 {t.footer.country}</span>
            <span className="text-xs text-background/25">KZT ₸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}