import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! (демо)');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">Свяжитесь с нами</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Мы готовы помочь вам с любыми вопросами о платформе Agrosauda</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-1 space-y-4">
              {[
                { icon: Mail, title: 'Email', value: 'info@agrosauda.kz', subtitle: 'Ответим в течение 24 часов' },
                { icon: Phone, title: 'Телефон', value: '+7 (7172) 55-00-00', subtitle: 'Пн-Пт, 9:00 - 18:00' },
                { icon: MapPin, title: 'Адрес', value: 'Астана, Казахстан', subtitle: 'ул. Мангилик Ел, 55/20' },
              ].map((item, i) => (
                <div key={i} className="premium-card p-5 rounded-xl flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </div>
              ))}

              <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Написать в WhatsApp
              </button>

              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Проект <span className="text-primary font-semibold">IPKadirzhanov</span></p>
                <p className="text-xs text-muted-foreground">Республика Казахстан</p>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="premium-card p-6 sm:p-8 rounded-2xl">
                <h2 className="font-display font-bold text-xl mb-6">Отправить сообщение</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Имя</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="email@example.com" required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Тема</label>
                  <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Тема обращения" />
                </div>
                <div className="mb-6">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Сообщение</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Опишите ваш вопрос..." required />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Отправить сообщение
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
