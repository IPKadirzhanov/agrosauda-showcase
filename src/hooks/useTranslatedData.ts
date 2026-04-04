import { useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getDataTranslations } from '@/data/dataTranslations';
import {
  products as rawProducts,
  categories as rawCategories,
  regions as rawRegions,
  newsArticles as rawNews,
  courses as rawCourses,
  subsidyPrograms as rawSubsidies,
  testimonials as rawTestimonials,
  stats as rawStats,
  type Product,
  type Category,
  type NewsArticle,
  type Course,
  type SubsidyProgram,
} from '@/data/mockData';

export function useTranslatedData() {
  const { lang } = useLanguage();

  return useMemo(() => {
    const dt = getDataTranslations(lang as 'ru' | 'kz' | 'en' | 'cn');

    const categories: Category[] = rawCategories.map(c => ({
      ...c,
      name: dt.categories[c.slug] || c.name,
    }));

    const regions: string[] = dt.regions;

    const products: Product[] = rawProducts.map(p => {
      const tr = dt.products[p.id];
      if (!tr) return p;
      const condition = p.condition === 'Новый' ? dt.conditions.new
        : p.condition === 'Б/У' ? dt.conditions.used
        : dt.conditions.restored;
      return {
        ...p,
        title: tr.title,
        description: tr.description,
        category: tr.category,
        location: tr.location,
        seller: tr.seller,
        condition: condition as Product['condition'],
        specs: tr.specs || p.specs,
      };
    });

    const newsArticles: NewsArticle[] = rawNews.map(n => {
      const tr = dt.news[n.id];
      if (!tr) return n;
      return { ...n, title: tr.title, excerpt: tr.excerpt, category: tr.category, date: tr.date, readTime: tr.readTime };
    });

    const courses: Course[] = rawCourses.map(c => {
      const tr = dt.courses[c.id];
      if (!tr) return c;
      return { ...c, title: tr.title, category: tr.category, level: tr.level, duration: tr.duration, instructor: tr.instructor };
    });

    const subsidyPrograms: SubsidyProgram[] = rawSubsidies.map(s => {
      const tr = dt.subsidies[s.id];
      if (!tr) return s;
      return { ...s, title: tr.title, description: tr.description, amount: tr.amount, deadline: tr.deadline, region: tr.region, category: tr.category };
    });

    const testimonials = rawTestimonials.map((t, i) => ({
      ...t,
      name: dt.testimonials[i]?.name || t.name,
      role: dt.testimonials[i]?.role || t.role,
      text: dt.testimonials[i]?.text || t.text,
    }));

    const stats = rawStats.map((s, i) => ({
      ...s,
      label: [dt.stats.label1, dt.stats.label2, dt.stats.label3, dt.stats.label4][i] || s.label,
    }));

    const classifiedsData = dt.classifieds;

    return { categories, regions, products, newsArticles, courses, subsidyPrograms, testimonials, stats, classifiedsData, conditions: dt.conditions };
  }, [lang]);
}
