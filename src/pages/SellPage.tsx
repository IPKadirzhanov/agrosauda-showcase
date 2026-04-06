import { Upload, Camera, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SellPage() {
  const { t } = useLanguage();
  const { categories, regions } = useTranslatedData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', region: '', price: '', condition: t.sell.conditionNew, description: '', seller: '', phone: '' });

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-main px-4 text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10" /></div>
            <h1 className="font-display font-bold text-3xl mb-3">{t.sell.submitted}</h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">{t.sell.submittedDesc}</p>
            <button onClick={() => setSubmitted(false)} className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">{t.sell.submitAnother}</button>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEOHead title="Продать товар — Agrosauda" description="Разместите объявление о продаже сельхозпродукции на Agrosauda. Быстрая продажа техники, семян, удобрений в Казахстане." keywords="продать, объявление, сельхоз, Казахстан" canonical="https://agrosauda.kz/sell" />
      <Breadcrumbs />
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">{t.sell.pageTitle}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.sell.pageSubtitle}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success(t.sell.toastSuccess); }} className="premium-card p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto">
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">{t.sell.photos}</label>
              <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">{t.sell.photosHint}</p>
                <p className="text-xs text-muted-foreground">{t.sell.photosLimit}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.productName}</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder={t.sell.productNamePlaceholder} required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.category}</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm" required>
                  <option value="">{t.sell.selectCategory}</option>
                  {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.region}</label>
                <select value={form.region} onChange={e => setForm({...form, region: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm" required>
                  <option value="">{t.sell.selectRegion}</option>
                  {regions.filter(r => r !== 'Все регионы').map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.priceLabel}</label>
                <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder={t.sell.pricePlaceholder} required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.condition}</label>
                <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm">
                  <option>{t.sell.conditionNew}</option><option>{t.sell.conditionUsed}</option><option>{t.sell.conditionRefurbished}</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.sellerName}</label>
                <input type="text" value={form.seller} onChange={e => setForm({...form, seller: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder={t.sell.sellerNamePlaceholder} required />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.phone}</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder={t.auth.phonePlaceholder} />
            </div>
            <div className="mb-6">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.sell.descriptionLabel}</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder={t.sell.descriptionPlaceholder} required />
            </div>
            <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-opacity shadow-lg">{t.sell.submitBtn}</button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}