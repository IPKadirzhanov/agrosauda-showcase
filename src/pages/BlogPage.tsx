import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/i18n/LanguageContext';
import { blogArticles, getArticleTitle, getArticleExcerpt } from '@/data/blogData';

export default function BlogPage() {
  const { t, lang } = useLanguage();

  const titles: Record<string, string> = {
    ru: 'Блог Agrosauda — статьи о сельском хозяйстве Казахстана',
    en: 'Agrosauda Blog — Articles about Kazakhstan Agriculture',
    kz: 'Agrosauda блогы — Қазақстан ауыл шаруашылығы туралы мақалалар',
    cn: 'Agrosauda博客 — 关于哈萨克斯坦农业的文章',
  };

  const descs: Record<string, string> = {
    ru: 'Статьи и аналитика о сельском хозяйстве Казахстана. Цены на зерно, обзоры рынка, руководства для фермеров.',
    en: 'Articles and analytics about Kazakhstan agriculture. Grain prices, market reviews, farmer guides.',
    kz: 'Қазақстан ауыл шаруашылығы туралы мақалалар мен талдаулар.',
    cn: '关于哈萨克斯坦农业的文章和分析。',
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEOHead
        title={titles[lang] || titles.ru}
        description={descs[lang] || descs.ru}
        keywords="блог, статьи, сельское хозяйство, Казахстан, пшеница, техника, агро"
        canonical="https://agrosauda.kz/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: titles[lang] || titles.ru,
          url: 'https://agrosauda.kz/blog',
          description: descs[lang] || descs.ru,
        }}
      />
      <Breadcrumbs />

      <div className="container-main px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            {t.blog?.title || 'Блог'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.blog?.subtitle || 'Статьи и аналитика о сельском хозяйстве Казахстана'}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogArticles.map((article, i) => (
            <AnimatedSection key={article.slug} delay={i * 0.1}>
              <Link to={`/blog/${article.slug}`} className="group block">
                <div className="premium-card rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="aspect-[2/1] overflow-hidden">
                    <img
                      src={article.image}
                      alt={getArticleTitle(article, lang)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{article.category}</span>
                    <h2 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {getArticleTitle(article, lang)}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {getArticleExcerpt(article, lang)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                        {t.blog?.readMore || 'Читать'} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
