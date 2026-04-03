import { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, ShoppingBag, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n';
import { toast } from 'sonner';

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

interface Props {
  video: ShortVideo;
  isActive: boolean;
  onCommentClick: () => void;
}

export default function ShortVideoCard({ video, isActive, onCommentClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes_count);
  const [showHeart, setShowHeart] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastTapRef = useRef(0);
  const { user } = useAuth();
  const { t } = useLanguage();

  // Check if user already liked
  useEffect(() => {
    if (!user) return;
    supabase
      .from('agro_shorts_likes')
      .select('id')
      .eq('short_id', video.id)
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => setLiked(!!data));
  }, [user, video.id]);

  // Autoplay/pause based on visibility
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive) {
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // Increment view count once
  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => {
      supabase.from('agro_shorts').update({ views_count: video.views_count + 1 }).eq('id', video.id);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isActive, video.id, video.views_count]);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); }
    else { el.pause(); setPlaying(false); }
  }, []);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      handleLike();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
      setTimeout(() => { if (lastTapRef.current !== 0) { togglePlay(); lastTapRef.current = 0; } }, 300);
    }
  }, [togglePlay]);

  const handleLike = async () => {
    if (!user) { toast.info(t.agroShorts.loginToInteract); return; }
    if (liked) {
      await supabase.from('agro_shorts_likes').delete().eq('short_id', video.id).eq('user_id', user.id);
      setLiked(false);
      setLikesCount(c => c - 1);
    } else {
      await supabase.from('agro_shorts_likes').insert({ short_id: video.id, user_id: user.id });
      setLiked(true);
      setLikesCount(c => c + 1);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/agroshorts?v=${video.id}`);
    toast.success(t.agroShorts.linkCopied);
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (el && el.duration) setProgress((el.currentTime / el.duration) * 100);
  };

  const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden snap-start snap-always" onClick={handleTap}>
      <video
        ref={videoRef}
        src={video.video_url}
        className="w-full h-full object-cover"
        loop
        muted={muted}
        playsInline
        preload="auto"
        poster={video.thumbnail_url || undefined}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Play/Pause overlay */}
      <AnimatePresence>
        {!playing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <Play className="w-16 h-16 text-white/80" fill="white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Double-tap heart */}
      <AnimatePresence>
        {showHeart && (
          <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 1.2, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 text-red-500" fill="red" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-10">
        <button onClick={(e) => { e.stopPropagation(); handleLike(); }} className="flex flex-col items-center gap-1">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm ${liked ? 'bg-red-500/30' : 'bg-white/10'}`}>
            <Heart className={`w-6 h-6 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs font-medium drop-shadow">{formatCount(likesCount)}</span>
        </button>

        <button onClick={(e) => { e.stopPropagation(); onCommentClick(); }} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow">{formatCount(video.comments_count)}</span>
        </button>

        <button onClick={(e) => { e.stopPropagation(); handleShare(); }} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow">{t.agroShorts.share}</span>
        </button>

        <button onClick={(e) => { e.stopPropagation(); setMuted(!muted); }} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            {muted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </div>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-16 p-4 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16">
        <div className="flex items-center gap-2 mb-2">
          {video.author_avatar ? (
            <img src={video.author_avatar} className="w-8 h-8 rounded-full border border-white/30" alt="" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              {(video.author_name || '?')[0]}
            </div>
          )}
          <span className="text-white font-semibold text-sm drop-shadow">{video.author_name || 'User'}</span>
        </div>
        <h3 className="text-white font-bold text-base drop-shadow mb-1">{video.title}</h3>
        {video.description && (
          <p className="text-white/80 text-sm line-clamp-2 drop-shadow">{video.description}</p>
        )}
        {video.product_id && video.product_title && (
          <Link
            to={`/product/${video.product_id}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium backdrop-blur-sm hover:bg-primary transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {t.agroShorts.viewProduct}: {video.product_title}
          </Link>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
        <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
