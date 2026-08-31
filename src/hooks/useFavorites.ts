import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { isUuid } from '@/hooks/useCatalog';

const LOCAL_KEY = 'agrosauda_favorites';

function readLocal(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
  } catch {
    /* noop */
  }
}

/** Избранное: в базе для авторизованных, в localStorage для гостей. */
export function useFavorites() {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>(() => readLocal());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setIds(readLocal());
      return;
    }
    setLoading(true);
    const { data } = await supabase.from('favorites').select('product_id').eq('user_id', user.id);
    setIds((data || []).map((r) => r.product_id as string));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isFavorite = useCallback((productId: string) => ids.includes(productId), [ids]);

  const toggle = useCallback(
    async (productId: string) => {
      const active = ids.includes(productId);
      const next = active ? ids.filter((i) => i !== productId) : [...ids, productId];
      setIds(next);

      if (user && isUuid(productId)) {
        if (active) {
          await supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', productId);
        } else {
          await supabase.from('favorites').insert({ user_id: user.id, product_id: productId });
        }
      } else {
        writeLocal(next);
      }
      return !active;
    },
    [ids, user],
  );

  return { ids, isFavorite, toggle, loading, refresh };
}
