
-- Create agro_shorts table
CREATE TABLE public.agro_shorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  video_url text NOT NULL,
  thumbnail_url text,
  title text NOT NULL,
  description text,
  category text,
  likes_count integer NOT NULL DEFAULT 0,
  views_count integer NOT NULL DEFAULT 0,
  comments_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  is_promoted boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create agro_shorts_likes table
CREATE TABLE public.agro_shorts_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  short_id uuid NOT NULL REFERENCES public.agro_shorts(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, short_id)
);

-- Create agro_shorts_comments table
CREATE TABLE public.agro_shorts_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  short_id uuid NOT NULL REFERENCES public.agro_shorts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.agro_shorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agro_shorts_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agro_shorts_comments ENABLE ROW LEVEL SECURITY;

-- RLS for agro_shorts
CREATE POLICY "Shorts viewable by everyone" ON public.agro_shorts FOR SELECT USING (true);
CREATE POLICY "Users can insert own shorts" ON public.agro_shorts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own shorts" ON public.agro_shorts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own shorts" ON public.agro_shorts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS for likes
CREATE POLICY "Likes viewable by everyone" ON public.agro_shorts_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON public.agro_shorts_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.agro_shorts_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS for comments
CREATE POLICY "Comments viewable by everyone" ON public.agro_shorts_comments FOR SELECT USING (true);
CREATE POLICY "Users can comment" ON public.agro_shorts_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.agro_shorts_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Trigger for updated_at on agro_shorts
CREATE TRIGGER update_agro_shorts_updated_at
  BEFORE UPDATE ON public.agro_shorts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to increment likes_count
CREATE OR REPLACE FUNCTION public.increment_short_likes()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.agro_shorts SET likes_count = likes_count + 1 WHERE id = NEW.short_id;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_short_likes()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.agro_shorts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.short_id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER on_short_like_insert AFTER INSERT ON public.agro_shorts_likes FOR EACH ROW EXECUTE FUNCTION public.increment_short_likes();
CREATE TRIGGER on_short_like_delete AFTER DELETE ON public.agro_shorts_likes FOR EACH ROW EXECUTE FUNCTION public.decrement_short_likes();

-- Function to increment/decrement comments_count
CREATE OR REPLACE FUNCTION public.increment_short_comments()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.agro_shorts SET comments_count = comments_count + 1 WHERE id = NEW.short_id;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_short_comments()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.agro_shorts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.short_id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER on_short_comment_insert AFTER INSERT ON public.agro_shorts_comments FOR EACH ROW EXECUTE FUNCTION public.increment_short_comments();
CREATE TRIGGER on_short_comment_delete AFTER DELETE ON public.agro_shorts_comments FOR EACH ROW EXECUTE FUNCTION public.decrement_short_comments();

-- Storage bucket for videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('agro-shorts', 'agro-shorts', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/quicktime']);

-- Storage RLS
CREATE POLICY "Anyone can view shorts videos" ON storage.objects FOR SELECT USING (bucket_id = 'agro-shorts');
CREATE POLICY "Authenticated users can upload shorts" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'agro-shorts');
CREATE POLICY "Users can delete own shorts videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'agro-shorts' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Enable realtime for shorts
ALTER PUBLICATION supabase_realtime ADD TABLE public.agro_shorts;
