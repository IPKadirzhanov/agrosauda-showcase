import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import { useLanguage } from '@/i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AnimatedSection className="text-center">
        <div className="font-display font-bold text-8xl sm:text-9xl text-primary/20 mb-4">404</div>
        <h1 className="font-display font-bold text-3xl mb-3">{t.notFound.title}</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">{t.notFound.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">{t.notFound.goHome}</Link>
          <Link to="/marketplace" className="px-7 py-3 rounded-xl border border-border font-semibold hover:bg-accent transition-colors">{t.notFound.goToCatalog}</Link>
        </div>
      </AnimatedSection>
    </div>
  );
}