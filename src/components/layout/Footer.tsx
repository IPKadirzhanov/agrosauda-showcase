import { Link } from 'react-router-dom';

const footerLinks = {
  'Маркетплейс': [
    { name: 'Все товары', path: '/marketplace' },
    { name: 'Тракторы', path: '/marketplace?cat=tractors' },
    { name: 'Комбайны', path: '/marketplace?cat=combines' },
    { name: 'Семена', path: '/marketplace?cat=seeds' },
    { name: 'Удобрения', path: '/marketplace?cat=fertilizers' },
    { name: 'Запчасти', path: '/marketplace?cat=spare-parts' },
  ],
  'Сервисы': [
    { name: 'Безопасная сделка', path: '/safe-deal' },
    { name: 'Субсидии', path: '/subsidies' },
    { name: 'AI Ассистенты', path: '/ai-assistants' },
    { name: 'Обучение', path: '/education' },
    { name: 'Продать товар', path: '/sell' },
  ],
  'Компания': [
    { name: 'О нас', path: '/about' },
    { name: 'Новости', path: '/news' },
    { name: 'Контакты', path: '/contact' },
    { name: 'Политика конфиденциальности', path: '#' },
    { name: 'Условия использования', path: '#' },
  ],
  'Поддержка': [
    { name: 'Центр помощи', path: '/contact' },
    { name: 'FAQ', path: '/safe-deal' },
    { name: 'Для продавцов', path: '/sell' },
    { name: 'Для покупателей', path: '/safe-deal' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-background/80 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main section-padding relative">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-lg">
                A
              </div>
              <span className="font-display font-bold text-xl text-background">
                Agro<span className="text-primary">sauda</span>
              </span>
            </Link>
            <p className="text-sm text-background/50 leading-relaxed mb-5">
              Крупнейший сельскохозяйственный маркетплейс Казахстана. Покупка и продажа техники, оборудования и услуг.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/5 border border-background/10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
              <p className="text-[11px] text-background/40 font-medium">
                Разработано <span className="text-primary">IPKadirzhanov</span>
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-background text-sm mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-background/40 hover:text-primary transition-colors duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30 text-center sm:text-left">
            © {new Date().getFullYear()} Agrosauda. Все права защищены. Проект IPKadirzhanov. Республика Казахстан.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-background/25">🇰🇿 Казахстан</span>
            <span className="text-xs text-background/25">KZT ₸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
