
"use client";

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ApplicantProfile } from '@/data/minigame-credit-swipe-data';
import { Card } from '@/components/ui/card';
import { Banknote, GaugeCircle, History, Briefcase, ThumbsUp, ThumbsDown } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ApplicantCardProps {
    applicant: ApplicantProfile;
    onSwipe: (direction: 'left' | 'right') => void;
    isActive: boolean;
}

export default function ApplicantCard({ applicant, onSwipe, isActive }: ApplicantCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, 200], [0.5, 0.5]);

    const getScoreColor = (score: number) => {
        if (score >= 740) return '#4ade80'; // green-400
        if (score >= 670) return '#facc15'; // yellow-400
        return '#f87171'; // red-400
    };
    
    const getDtiColor = (dti: 'Low' | 'Medium' | 'High') => {
        if (dti === 'Low') return '#4ade80';
        if (dti === 'Medium') return '#facc15';
        return '#f87171';
    }

    const scoreColor = getScoreColor(applicant.creditScore);

    return (
        <motion.div
            className="absolute"
            style={{ x, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
                if (info.offset.x > 100) {
                    onSwipe('right');
                } else if (info.offset.x < -100) {
                    onSwipe('left');
                }
            }}
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: isActive ? 0 : -20, opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="w-[350px] h-[500px] bg-card/60 backdrop-blur-xl border-2 border-border/20 shadow-2xl rounded-2xl p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <Image src={applicant.avatarUrl} width={60} height={60} alt={applicant.name} className="rounded-full border-2 border-primary" />
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{applicant.name}</h2>
                            <p className="text-sm text-muted-foreground">{applicant.loanRequest.title}</p>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-lg text-muted-foreground">Requesting</p>
                        <p className="text-4xl font-black text-primary">${applicant.loanRequest.amount.toLocaleString()}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                    <Card className="p-3 bg-background/50">
                         <div className="w-24 h-24 mx-auto">
                            <CircularProgressbar
                                value={applicant.creditScore}
                                minValue={300}
                                maxValue={850}
                                text={`${applicant.creditScore}`}
                                styles={buildStyles({
                                    pathColor: scoreColor,
                                    textColor: scoreColor,
                                    trailColor: 'hsl(var(--muted) / 0.2)',
                                    textSize: '24px'
                                })}
                            />
                        </div>
                        <p className="mt-2 text-sm font-semibold text-muted-foreground">Credit Score</p>
                    </Card>

                    <div className="space-y-3">
                         <Card className="p-3 bg-background/50 flex flex-col items-center justify-center h-full">
                            <Briefcase className="w-6 h-6 text-primary mb-1"/>
                            <p className="text-lg font-bold">${applicant.income.toLocaleString()}/mo</p>
                            <p className="text-xs text-muted-foreground">Income</p>
                         </Card>
                    </div>
                    <Card className="p-3 bg-background/50">
                        <GaugeCircle style={{ color: getDtiColor(applicant.dti) }} className="w-8 h-8 text-primary mx-auto mb-1"/>
                        <p className="text-lg font-bold">{applicant.dti}</p>
                        <p className="text-xs text-muted-foreground">Debt Level</p>
                    </Card>
                    <Card className="p-3 bg-background/50">
                        {applicant.paymentHistory === 'On Time' ? (
                            <ThumbsUp className="w-8 h-8 text-green-400 mx-auto mb-1"/>
                        ) : (
                             <ThumbsDown className="w-8 h-8 text-red-400 mx-auto mb-1"/>
                        )}
                        <p className="text-lg font-bold">{applicant.paymentHistory}</p>
                        <p className="text-xs text-muted-foreground">Payments</p>
                    </Card>
                </div>
            </Card>
        </motion.div>
    );
}
