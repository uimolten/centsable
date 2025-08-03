
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FeedbackBannerProps {
    type: 'correct' | 'incorrect';
    message: string;
}

export default function FeedbackBanner({ type, message }: FeedbackBannerProps) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-md p-4 rounded-lg shadow-lg flex items-center gap-3 z-30",
                type === 'correct' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
            )}
        >
            {type === 'correct' ? <CheckCircle2 className="w-6 h-6"/> : <XCircle className="w-6 h-6"/>}
            <p className="font-semibold">{message}</p>
        </motion.div>
    );
}
