import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const PROMO_PLANS = [
  { id: 'top7', label: 'ТОП на 7 дней', days: 7, amount: 2000, perks: ['Показ в начале списка', 'Метка «ТОП»'] },
  { id: 'top14', label: 'ТОП на 14 дней', days: 14, amount: 3500, perks: ['Показ в начале списка', 'Метка «ТОП»', 'Блок «Рекомендуемые»'] },
  { id: 'top30', label: 'ТОП на 30 дней', days: 30, amount: 6000, perks: ['Показ в начале списка', 'Метка «ТОП»', 'Блок «Рекомендуемые»', 'Максимальный охват'] },
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: { id: string; title: string } | null;
}

export default function PromoteListingDialog({ open, onOpenChange, product }: Props) {
  const [selected, setSelected] = useState('top7');
  const [loading, setLoading] = useState(false);

  const formatPrice = (p: number) => new Intl.NumberFormat('ru-RU').format(p) + ' ₸';

  const handlePay = async () => {
    if (!product) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('freedompay-init', {
        body: { product_id: product.id, plan: selected, return_url: `${window.location.origin}/dashboard` },
      });
      if (error || !data?.redirect_url) {
        toast.error(data?.error || error?.message || 'Не удалось создать платёж');
        setLoading(false);
        return;
      }
      window.location.href = data.redirect_url;
    } catch {
      toast.error('Ошибка соединения с платёжной системой');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Rocket className="w-5 h-5 text-primary" /> Продвижение объявления
          </DialogTitle>
          <DialogDescription className="truncate">{product?.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {PROMO_PLANS.map(plan => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelected(plan.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected === plan.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{plan.label}</span>
                <span className="font-bold text-primary">{formatPrice(plan.amount)}</span>
              </div>
              <ul className="space-y-1">
                {plan.perks.map(perk => (
                  <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-primary shrink-0" /> {perk}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <Button onClick={handlePay} disabled={loading} className="w-full mt-4 rounded-xl gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
          Оплатить через Freedom Pay
        </Button>
        <p className="text-[11px] text-muted-foreground text-center">
          Оплата картой Visa/Mastercard через защищённый шлюз Freedom Pay. Продвижение включается автоматически после оплаты.
        </p>
      </DialogContent>
    </Dialog>
  );
}