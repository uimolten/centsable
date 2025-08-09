import { motion } from 'framer-motion';

interface SpeechBubbleProps {
  text: string;
}

export function SpeechBubble({ text }: SpeechBubbleProps) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative bg-card/70 backdrop-blur-lg border border-border/20 text-foreground rounded-2xl p-6 w-full max-w-2xl text-center shadow-lg"
    >
      <p
        className="text-xl md:text-2xl font-semibold leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div className="absolute left-1/2 -bottom-2.5 transform -translate-x-1/2 w-5 h-5 bg-card/70 border-r border-b border-border/20 rotate-45 backdrop-blur-lg"></div>
    </motion.div>
  );
}
