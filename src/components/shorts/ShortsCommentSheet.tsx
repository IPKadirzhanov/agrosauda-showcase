import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n';
import { toast } from 'sonner';

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_name?: string;
  author_avatar?: string;
}

interface Props {
  shortId: string;
  open: boolean;
  onClose: () => void;
}

export default function ShortsCommentSheet({ shortId, open, onClose }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    fetchComments();
  }, [open, shortId]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('agro_shorts_comments')
      .select('*')
      .eq('short_id', shortId)
      .order('created_at', { ascending: false })
      .limit(100);
    if (!data) return;

    const userIds = [...new Set(data.map(c => c.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, display_name, avatar_url')
      .in('user_id', userIds);

    const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
    setComments(data.map(c => ({
      ...c,
      author_name: profileMap.get(c.user_id)?.display_name || 'User',
      author_avatar: profileMap.get(c.user_id)?.avatar_url || undefined,
    })));
  };

  const handleSend = async () => {
    if (!user) { toast.info(t.agroShorts.loginToInteract); return; }
    if (!text.trim()) return;
    setLoading(true);
    await supabase.from('agro_shorts_comments').insert({
      short_id: shortId,
      user_id: user.id,
      content: text.trim(),
    });
    setText('');
    setLoading(false);
    fetchComments();
  };

  const timeAgo = (d: string) => {
    const diff = (Date.now() - new Date(d).getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 h-[60vh] bg-black/95 backdrop-blur-xl rounded-t-3xl z-30 flex flex-col border-t border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-white font-semibold">{t.agroShorts.comments} ({comments.length})</h3>
            <button onClick={onClose} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map(c => (
              <div key={c.id} className="flex gap-3">
                {c.author_avatar ? (
                  <img src={c.author_avatar} className="w-8 h-8 rounded-full shrink-0" alt="" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {(c.author_name || '?')[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 text-sm font-medium">{c.author_name}</span>
                    <span className="text-white/40 text-xs">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="text-white/90 text-sm mt-0.5">{c.content}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-white/40 text-center py-8">{t.agroShorts.noVideos}</p>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.agroShorts.addComment}
              className="flex-1 bg-white/10 text-white placeholder:text-white/40 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-white/30"
            />
            <button
              onClick={handleSend}
              disabled={loading || !text.trim()}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
