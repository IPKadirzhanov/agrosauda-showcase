import { Clock, Tag } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { newsArticles } from '@/data/mockData';

export default function NewsPage() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-2">Новости АПК</h1>
          <p className="text-muted-foreground text-lg">Актуальные события сельского хозяйства Казахстана</p>
        </AnimatedSection>

        {/* Featured */}
        <AnimatedSection className="mb-12">
          <div className="premium-card rounded-2xl overflow-hidden group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">{featured.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                <p className="text-xs text-muted-foreground">{featured.date}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.1}>
              <div className="premium-card rounded-2xl overflow-hidden group cursor-pointer">
                <div className="aspect-video overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">{article.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {article.readTime}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground">{article.date}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
