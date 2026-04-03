import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n';
import ShortVideoCard from '@/components/shorts/ShortVideoCard';
import ShortsCommentSheet from '@/components/shorts/ShortsCommentSheet';
import ShortsUploadModal from '@/components/shorts/ShortsUploadModal';

interface ShortVideo {
  id: string;
  user_id: string;
  product_id: string | null;
  video_url: string;
  thumbnail_url: string | null;
  title: string;
  description: string | null;
  likes_count: number;
  views_count: number;
  comments_count: number;
  created_at: string;
  author_name?: string;
  author_avatar?: string;
  product_title?: string;
  product_price?: number;
  product_image?: string;
}

export default function AgroShortsPage() {
  const [videos, setVideos] = useState<ShortVideo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { t } = useLanguage();

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('agro_shorts')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) { console.error('Fetch shorts error:', error); setLoading(false); return; }
    if (!data || data.length === 0) { setVideos([]); setLoading(false); return; }

    // Fetch author profiles
    const userIds = [...new Set(data.map(v => v.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, display_name, avatar_url')
      .in('user_id', userIds);
    const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

    // Fetch linked products
    const productIds = data.filter(v => v.product_id).map(v => v.product_id!);
    let productMap = new Map<string, { title: string; price: number; image: string | null }>();
    if (productIds.length > 0) {
      const { data: prods } = await supabase
        .from('products')
        .select('id, title, price, image')
        .in('id', productIds);
      productMap = new Map(prods?.map(p => [p.id, p]) || []);
    }

    setVideos(data.map(v => ({
      ...v,
      author_name: profileMap.get(v.user_id)?.display_name || undefined,
      author_avatar: profileMap.get(v.user_id)?.avatar_url || undefined,
      product_title: v.product_id ? productMap.get(v.product_id)?.title : undefined,
      product_price: v.product_id ? productMap.get(v.product_id)?.price : undefined,
      product_image: v.product_id ? productMap.get(v.product_id)?.image : undefined,
    })));
    setLoading(false);
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  // Snap scroll observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    container.querySelectorAll('[data-index]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [videos]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Link to="/" className="text-white/80 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-white font-bold text-lg">{t.agroShorts.title}</h1>
        {user && (
          <button onClick={() => setUploadOpen(true)} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Plus className="w-5 h-5" />
          </button>
        )}
        {!user && <div className="w-9" />}
      </div>

      {videos.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-white/40" />
          </div>
          <h2 className="text-white font-semibold text-xl mb-2">{t.agroShorts.noVideos}</h2>
          <p className="text-white/50 text-sm">{t.agroShorts.noVideosDesc}</p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {videos.map((video, idx) => (
            <div key={video.id} data-index={idx} className="h-screen w-full" style={{ scrollSnapAlign: 'start' }}>
              {Math.abs(idx - activeIndex) <= 1 ? (
                <ShortVideoCard
                  video={video}
                  isActive={idx === activeIndex}
                  onCommentClick={() => setCommentOpen(true)}
                />
              ) : (
                <div className="w-full h-full bg-black" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Comment sheet */}
      {videos[activeIndex] && (
        <ShortsCommentSheet
          shortId={videos[activeIndex].id}
          open={commentOpen}
          onClose={() => setCommentOpen(false)}
        />
      )}

      {/* Upload modal */}
      <ShortsUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSuccess={fetchVideos}
      />
    </div>
  );
}
