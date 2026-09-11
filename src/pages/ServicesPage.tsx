import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ArrowRight, Leaf, FileText, Handshake, PlayCircle, Brain, GraduationCap, Newspaper,
  User, Globe, ChevronDown,
} from 'lucide-react';
import { useLanguage, languages } from '@/i18n';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';

export default function ServicesPage() {
  const { t, lang, setLang } = useLanguage();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const titles: Record<string, { title: string; subtitle: string; search: string }> = {
    ru: { title: 'Сервисы', subtitle: 'Все возможности для вашего бизнеса в одном месте', search: 'Поиск сервисов...' },
    kz: { title: 'Сервистер', subtitle: 'Бизнесіңізге қажетті барлық мүмкіндік бір жерде', search: 'Сервистерді іздеу...' },
    en: { title: 'Services', subtitle: 'Everything your business needs in one place', search: 'Search services...' },
    cn: { title: '服务', subtitle: '您业务所需的一切尽在一处', search: '搜索服务...' },
  };
  const head = titles[lang] || titles.ru;

  const services = [
    { to: '/agro-shop', title: t.nav.agroShop, Icon: Leaf, tone: 'from-emerald-400/25 to-emerald-600/10 text-emerald-400' },
    { to: '/classifieds', title: t.nav.classifieds, Icon: FileText, tone: 'from-sky-400/25 to-sky-600/10 text-sky-400' },
    { to: '/agrobroker', title: t.nav.agroBroker, Icon: Handshake, tone: 'from-violet-400/25 to-violet-600/10 text-violet-400' },
    { to: '/agroshorts', title: t.nav.agroShorts, Icon: PlayCircle, tone: 'from-teal-400/25 to-teal-600/10 text-teal-300' },
    { to: '/ai-assistants', title: t.nav.aiAssistants, Icon: Brain, tone: 'from-blue-400/25 to-blue-600/10 text-blue-400' },
    { to: '/education', title: t.nav.education, Icon: GraduationCap, tone: 'from-fuchsia-400/25 to-fuchsia-600/10 text-fuchsia-400' },
  ];

  const filtered = services.filter(s => s.title.toLowerCase().includes(query.toLowerCase()));
  const showNews = t.nav.news.toLowerCase().includes(query.toLowerCase());

  const cabinetPath = !user
    ? '/auth'
    : userRole === 'broker' ? '/dashboard/broker' : userRole === 'business' ? '/dashboard/business' : '/dashboard';

  const currentLang = languages.find(l => l.code === lang);

  return (
    <main className="min-h-screen bg-[hsl(160_22%_5%)] text-[hsl(120_8%_95%)] pt-20 pb-32">
      <SEOHead
        title="Сервисы Agrosauda — все разделы платформы"
        description="Agro Shop, объявления, AgroBroker, AgroShorts, AI-ассистенты, обучение и новости — все сервисы Agrosauda в одном месте."
      />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.18),transparent)] pointer-events-none" />

      <div className="relative max-w-[560px] mx-auto px-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight">{head.title}</h1>
            <p className="mt-2 text-sm text-[hsl(120_8%_95%/0.6)] max-w-[16rem]">{head.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 h-11 px-3 rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl text-xs font-medium uppercase tracking-wide"
              >
                <Globe className="w-3.5 h-3.5 opacity-70" />
                {currentLang?.code}
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-full mt-2 w-36 rounded-2xl border border-white/12 bg-[hsl(160_18%_9%)]/95 backdrop-blur-xl overflow-hidden z-50"
                >
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as any); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] ${
                        lang === l.code ? 'bg-primary/15 text-primary font-medium' : 'text-white/80'
                      }`}
                    >
                      <span>{l.flag}</span> {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <button
              onClick={() => navigate(cabinetPath)}
              aria-label={user ? t.nav.cabinet : t.nav.login}
              className="w-11 h-11 flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl"
            >
              <User className="w-4.5 h-4.5 opacity-80" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6 flex items-center gap-3 h-14 px-4 rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl">
          <Search className="w-4.5 h-4.5 opacity-50" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={head.search}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
          />
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {filtered.map(({ to, title, Icon, tone }) => (
            <Link
              key={to}
              to={to}
              className="group relative aspect-square flex flex-col justify-between p-4 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tone} flex items-center justify-center border border-white/10`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <h2 className="font-display text-[15px] font-semibold leading-tight">{title}</h2>
            </Link>
          ))}
        </div>

        {showNews && (
          <Link
            to="/news"
            className="group mt-3 flex items-center gap-4 p-4 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07]"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400/25 to-teal-600/10 text-teal-300 border border-white/10 flex items-center justify-center shrink-0">
              <Newspaper className="w-6 h-6" />
            </div>
            <h2 className="flex-1 font-display text-[15px] font-semibold">{t.nav.news}</h2>
            <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        )}
      </div>
    </main>
  );
}
