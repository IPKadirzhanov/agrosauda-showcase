import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PlaySquare, PlusCircle, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/i18n';

export default function BottomNav() {
  const location = useLocation();
  const { lang } = useLanguage();

  const labels: Record<string, string[]> = {
    ru: ['Главная', 'Шортс', 'Объявление', 'Сервисы'],
    kz: ['Басты бет', 'Шортс', 'Хабарландыру', 'Сервистер'],
    en: ['Home', 'Shorts', 'Post', 'Services'],
    cn: ['首页', '短视频', '发布', '服务'],
  };
  const l = labels[lang] || labels.ru;

  const items = [
    { path: '/', label: l[0], Icon: Home },
    { path: '/agroshorts', label: l[1], Icon: PlaySquare },
    { path: '/sell', label: l[2], Icon: PlusCircle },
    { path: '/services', label: l[3], Icon: LayoutGrid },
  ];

  const activeIndex = items.findIndex(i => i.path === location.pathname);

  return (
    <nav
      className="xl:hidden fixed bottom-0 left-0 right-0 z-50 px-3"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
    >
      <div className="relative flex items-stretch justify-between rounded-[1.75rem] border border-white/15 bg-foreground/60 backdrop-blur-2xl shadow-[0_8px_32px_hsl(var(--foreground)/0.25)] px-2 py-2 overflow-hidden">
        {items.map(({ path, label, Icon }, i) => {
          const isActive = i === activeIndex;
          return (
            <Link
              key={path}
              to={path}
              className="relative flex-1 flex flex-col items-center gap-1 py-1.5 rounded-2xl"
            >
              {isActive && (
                <motion.span
                  layoutId="bottomnav-indicator"
                  className="absolute inset-0 rounded-2xl bg-primary/15 border border-primary/40 shadow-[0_0_18px_hsl(var(--primary)/0.55),inset_0_0_12px_hsl(var(--primary)/0.25)]"
                  transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }}
                />
              )}
              <Icon
                className={`relative w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.8)]' : 'text-background/70'
                }`}
              />
              <span
                className={`relative text-[10.5px] font-medium leading-none transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-background/70'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
