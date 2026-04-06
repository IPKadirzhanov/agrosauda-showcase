import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/i18n/LanguageContext';
import { getBlogArticle, getArticleTitle, getArticleExcerpt, getArticleContent, blogArticles } from '@/data/blogData';
import ReactMarkdown from 'react-markdown';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const article = slug ? getBlogArticle(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <div className="container-main px-4">
          <h1 className="font-display font-bold text-3xl mb-4">{t.notFound?.title || 'Не найдено'}</h1>
          <Link to="/blog" className="text-primary hover:underline">← {t.blog?.backToBlog || 'Вернуться в блог'}</Link>
        </div>
      </div>
    );
  }

  const title = getArticleTitle(article, lang);
  const excerpt = getArticleExcerpt(article, lang);
  const content = getArticleContent(article, lang);
  const otherArticles = blogArticles.filter(a => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEOHead
        title={`${title} | Agrosauda`}
        description={excerpt}
        keywords={`${article.category}, сельское хозяйство, Казахстан, Agrosauda`}
        canonical={`https://agrosauda.kz/blog/${slug}`}
        ogImage={article.image}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: excerpt,
          image: article.image,
          datePublished: article.date,
          author: { '@type': 'Organization', name: 'Agrosauda' },
          publisher: { '@type': 'Organization', name: 'Agrosauda', url: 'https://agrosauda.kz' },
          url: `https://agrosauda.kz/blog/${slug}`,
        }}
      />
      <Breadcrumbs items={[
        { label: t.blog?.title || 'Блог', path: '/blog' },
        { label: title },
      ]} />

      <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <AnimatedSection>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.blog?.backToBlog || 'Вернуться в блог'}
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{article.category}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2 mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
            </div>
          </div>

          <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-10">
            <img src={article.image} alt={title} className="w-full h-full object-cover" loading="lazy" />
          </div>

          <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </AnimatedSection>

        {otherArticles.length > 0 && (
          <AnimatedSection className="mt-16">
            <h2 className="font-display font-bold text-2xl mb-6">{t.blog?.relatedArticles || 'Другие статьи'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherArticles.map(a => (
                <Link key={a.slug} to={`/blog/${a.slug}`} className="group premium-card rounded-xl overflow-hidden flex flex-col">
                  <div className="aspect-[2/1] overflow-hidden">
                    <img src={a.image} alt={getArticleTitle(a, lang)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">{getArticleTitle(a, lang)}</h3>
                    <span className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
                      {t.blog?.readMore || 'Читать'} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
