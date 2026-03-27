import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, BadgeCheck } from 'lucide-react';

const mockShops = [
  { name: 'АгроТех Казахстан', type: 'ТОО', verified: true, products: 48, region: 'Астана' },
  { name: 'KazGrain Supply', type: 'ИП', verified: true, products: 32, region: 'Костанай' },
  { name: 'Green Farm Equipment', type: 'ТОО', verified: false, products: 15, region: 'Алматы' },
  { name: 'Степной Агро', type: 'ТОО', verified: true, products: 67, region: 'Караганда' },
];

export default function AdminShopsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Agro Shop — Магазины</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {mockShops.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{s.name}</p>
                      {s.verified && <BadgeCheck className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{s.type} · {s.region}</p>
                  </div>
                </div>
                <Badge variant={s.verified ? 'default' : 'secondary'}>
                  {s.verified ? 'Верифицирован' : 'На проверке'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{s.products} товаров</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
