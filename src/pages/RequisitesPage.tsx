import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function RequisitesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <SEOHead title="Реквизиты — Agrosauda" description="Банковские реквизиты ТОО AGROSAUDA KAZAKHSTAN" />
      <div className="container-main">
        <Breadcrumbs />
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Реквизиты компании</h1>

        <div className="max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Клиенттің деректемелері / Реквизиты клиента</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Атауы / Наименование</p>
                  <p className="text-sm font-medium text-foreground">ТОО «AGROSAUDA KAZAKHSTAN»</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">ЖСН (БСН) / ИИН (БИН)</p>
                  <p className="text-sm font-medium text-foreground">251040033871</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">БеК / КБе</p>
                  <p className="text-sm font-medium text-foreground">17</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Банктің атауы / Наименование банка</p>
                  <p className="text-sm font-medium text-foreground">АО «Народный Банк Казахстана»</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">БСК / БИК</p>
                  <p className="text-sm font-medium text-foreground">HSBKKZKX</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Валютасы / Валюта</p>
                  <p className="text-sm font-medium text-foreground">KZT</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">ЖСК / ИИК (Клиенттің шоттары / Счета клиента)</p>
                <p className="text-sm font-medium text-foreground font-mono">KZ33601A151020387141</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-muted/50 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-semibold text-foreground">Контактная информация</h3>
            <p className="text-sm text-muted-foreground">Email: info@agrosauda.kz</p>
            <p className="text-sm text-muted-foreground">Телефон: +7 747 948 13 18</p>
            <p className="text-sm text-muted-foreground">Сайт: agrosauda.kz</p>
          </div>
        </div>
      </div>
    </main>
  );
}
