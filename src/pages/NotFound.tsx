import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AnimatedSection className="text-center">
        <div className="font-display font-bold text-8xl sm:text-9xl text-primary/20 mb-4">404</div>
        <h1 className="font-display font-bold text-3xl mb-3">Страница не найдена</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Возможно, эта страница была удалена или вы перешли по неверной ссылке
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            На главную
          </Link>
          <Link to="/marketplace" className="px-7 py-3 rounded-xl border border-border font-semibold hover:bg-accent transition-colors">
            Каталог товаров
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
