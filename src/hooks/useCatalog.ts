import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import type { Product } from '@/data/mockData';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop';

export interface DbProductRow {
  id: string;
  title: string;
  category_slug: string;
  price: number;
  location: string;
  seller_name: string;
  condition: string;
  description: string | null;
  image: string | null;
  featured: boolean | null;
  specs: unknown;
  promoted_until: string | null;
  created_at: string;
}

export function mapDbProduct(
  row: DbProductRow,
  categoryName?: string,
): Product & { promotedUntil?: string | null; createdAt?: string } {
  const isPromoted = !!row.promoted_until && new Date(row.promoted_until).getTime() > Date.now();
  return {
    id: row.id,
    title: row.title,
    category: categoryName || row.category_slug,
    categorySlug: row.category_slug,
    price: Number(row.price) || 0,
    location: row.location,
    seller: row.seller_name,
    condition: (row.condition as Product['condition']) || 'Новый',
    description: row.description || '',
    image: row.image || FALLBACK_IMAGE,
    featured: isPromoted || !!row.featured,
    specs: (row.specs as Record<string, string>) || undefined,
    promotedUntil: row.promoted_until,
    createdAt: row.created_at,
  };
}

/**
 * Реальные одобренные объявления из базы + демо-каталог как запасной вариант.
 * Продвинутые (оплаченные) объявления идут первыми.
 */
export function useCatalogProducts() {
  const { products: demoProducts, categories } = useTranslatedData();
  const [dbRows, setDbRows] = useState<DbProductRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('products')
      .select(
        'id,title,category_slug,price,location,seller_name,condition,description,image,featured,specs,promoted_until,created_at',
      )
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(500)
      .then(({ data }) => {
        if (cancelled) return;
        setDbRows((data as DbProductRow[]) || []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => {
    const nameBySlug = new Map(categories.map((c) => [c.slug, c.name]));
    const now = Date.now();
    const dbProducts = dbRows
      .map((r) => mapDbProduct(r, nameBySlug.get(r.category_slug)))
      .sort((a, b) => {
        const ap = a.promotedUntil && new Date(a.promotedUntil).getTime() > now ? 1 : 0;
        const bp = b.promotedUntil && new Date(b.promotedUntil).getTime() > now ? 1 : 0;
        if (ap !== bp) return bp - ap;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });

    return {
      loading,
      dbProducts,
      hasDbProducts: dbProducts.length > 0,
      // реальные объявления всегда сверху, демо — ниже
      products: [...dbProducts, ...demoProducts] as Product[],
    };
  }, [dbRows, demoProducts, categories, loading]);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value?: string | null): boolean {
  return !!value && UUID_RE.test(value);
}
