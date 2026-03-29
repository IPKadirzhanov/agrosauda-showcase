import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIChatWidget from './AIChatWidget';

export default function FloatingAIWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[370px] max-w-[calc(100vw-3rem)] shadow-2xl rounded-2xl overflow-hidden"
          >
            <AIChatWidget
              agentType="subsidiya_gid"
              agentName="СубсидияГид"
              placeholder="Задайте вопрос о субсидиях..."
              suggestions={['Какие субсидии есть?', 'Как подать заявку?', 'Документы для субсидий']}
              className="!shadow-none !border-0 max-h-[520px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-primary/30 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))',
        }}
      >
        {/* Liquid glass layers */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
        <div className="absolute inset-[3px] rounded-full bg-white/5 backdrop-blur-sm border border-white/20" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />

        {/* Animated glow ring */}
        <div className="absolute -inset-1 rounded-full bg-primary/20 animate-pulse-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-white relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-0.5 relative z-10"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-[9px] font-bold text-white tracking-wider">AI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
