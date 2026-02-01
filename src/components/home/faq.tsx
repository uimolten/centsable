"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqData = [
    {
        question: "What is Centsable?",
        answer: "Centsable is the ultimate gamified financial literacy platform. We turn boring finance lessons into an interactive adventure. By playing games, completing quests, and tracking your progress, you'll master real-world skills like **budgeting**, **investing**, and **managing credit** without the snooze-fest.",
    },
    {
        question: "Is Centsable free to use?",
        answer: "Yes! Our core mission is to make **financial education accessible to everyone**. You can access all our lessons, quizzes, and basic minigames for free. We believe money management is a life skill that shouldn't cost a fortune to learn.",
    },
    {
        question: "Can I really learn how to invest accurately?",
        answer: "Absolutely. Our **investing simulator** uses real market concepts to show you how stocks, bonds, and compound interest work—risk-free. You'll learn the difference between a 'Bull' and 'Bear' market, how to diversify a portfolio, and why 'time in the market' beats 'timing the market'.",
    },
    {
        question: "How does the budgeting tool help me?",
        answer: "We teach proven strategies like the **50/30/20 rule** (Needs/Wants/Savings). Instead of just reading about it, you'll practice allocating virtual paychecks in our **Budget Buster** minigame, helping you build muscle memory for when you handle your own real money.",
    },
    {
        question: "Is this suitable for students?",
        answer: "100%. Centsable is designed specifically for **students and young adults** starting their financial journey. Whether you're in high school, college, or your first job, our bite-sized lessons fit your busy schedule and prepare you for financial independence.",
    },
];

export function FAQ() {
    return (
        <section className="py-20 bg-background/50 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black font-headline mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Everything you need to know about mastering your money.
                    </p>
                </motion.div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <AccordionItem
                                value={`item-${index}`}
                                className="bg-card border border-border/50 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <AccordionTrigger className="text-lg font-semibold text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>') }} />
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>

            {/* Background decorations for extra flair */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
