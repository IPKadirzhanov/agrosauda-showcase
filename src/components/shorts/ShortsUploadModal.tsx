import { useState, useRef, useEffect } from 'react';
import { Upload, X, Film } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ShortsUploadModal({ open, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState<string>('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [products, setProducts] = useState<{ id: string; title: string }[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!open || !user) return;
    supabase.from('products').select('id, title').eq('seller_user_id', user.id).then(({ data }) => {
      if (data) setProducts(data);
    });
    supabase.from('categories').select('slug, name').then(({ data }) => {
      if (data) setCategories(data);
    });
  }, [open, user]);

  const validateFile = (f: File): string | null => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(f.type)) return t.agroShorts.invalidFormat;
    if (f.size > 52428800) return t.agroShorts.fileTooLarge;
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const err = validateFile(f);
    if (err) { toast.error(err); return; }
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file || !title.trim() || !user) return;
    setUploading(true);
    setProgress(10);

    try {
      const ext = file.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;

      setProgress(30);
      const { error: uploadError } = await supabase.storage
        .from('agro-shorts')
        .upload(path, file, { contentType: file.type });

      if (uploadError) throw uploadError;
      setProgress(70);

      const { data: { publicUrl } } = supabase.storage.from('agro-shorts').getPublicUrl(path);

      const { error: insertError } = await supabase.from('agro_shorts').insert({
        user_id: user.id,
        video_url: publicUrl,
        title: title.trim(),
        description: description.trim() || null,
        product_id: productId || null,
        category: category || null,
      });

      if (insertError) throw insertError;
      setProgress(100);
      toast.success(t.agroShorts.uploadSuccess);
      resetForm();
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(t.agroShorts.uploadError);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setProductId('');
    setCategory('');
    setProgress(0);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Film className="w-5 h-5 text-primary" />
            {t.agroShorts.uploadTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* File drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <input ref={fileRef} type="file" accept="video/mp4,video/webm,video/quicktime" onChange={handleFileChange} className="hidden" />
            {file ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground truncate">{file.name}</span>
                <button onClick={(e) => { e.stopPropagation(); setFile(null); }}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="w-8 h-8" />
                <span className="text-sm">MP4, WebM · Max 50MB</span>
              </div>
            )}
          </div>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.agroShorts.videoTitlePlaceholder}
            maxLength={100}
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.agroShorts.videoDescriptionPlaceholder}
            rows={2}
            maxLength={500}
          />

          {products.length > 0 && (
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger><SelectValue placeholder={t.agroShorts.selectProductPlaceholder} /></SelectTrigger>
              <SelectContent>
                {products.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
              </SelectContent>
            </Select>
          )}

          {categories.length > 0 && (
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder={t.agroShorts.categoryPlaceholder} /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}

          {uploading && <Progress value={progress} className="h-2" />}

          <Button onClick={handleUpload} disabled={!file || !title.trim() || uploading} className="w-full">
            {uploading ? t.agroShorts.uploading : t.agroShorts.upload}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
