
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { playClickSound } from '@/lib/audio-utils';

interface RejectionModalProps {
    isOpen: boolean;
    reasons: string[];
    onSelectReason: (reason: string) => void;
    onClose: () => void;
}

export default function RejectionModal({ isOpen, reasons, onSelectReason, onClose }: RejectionModalProps) {
    if (!isOpen) return null;
    
    const handleReasonClick = (reason: string) => {
        playClickSound();
        onSelectReason(reason);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Justification Required</CardTitle>
                        <CardDescription>What's the primary reason for this denial?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {reasons.map((reason) => (
                            <Button
                                key={reason}
                                variant="outline"
                                className="w-full text-base h-auto py-3 whitespace-normal"
                                onClick={() => handleReasonClick(reason)}
                            >
                                {reason}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
