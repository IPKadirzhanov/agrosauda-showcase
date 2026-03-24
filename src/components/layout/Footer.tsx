import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';

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
    <footer className="bg-foreground text-background/80">
      <div className="container-main section-padding">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                A
              </div>
              <span className="font-display font-bold text-xl text-background">
                Agro<span className="text-primary">sauda</span>
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed mb-4">
              Крупнейший сельскохозяйственный маркетплейс Казахстана. Покупка и продажа техники, оборудования и услуг.
            </p>
            <p className="text-xs text-background/40">
              Разработано и поддерживается <span className="text-primary font-medium">IPKadirzhanov</span>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-background text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-background/50 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40 text-center sm:text-left">
            © {new Date().getFullYear()} Agrosauda. Все права защищены. Проект IPKadirzhanov. Республика Казахстан.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-background/30">🇰🇿 Казахстан</span>
            <span className="text-xs text-background/30">KZT ₸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
