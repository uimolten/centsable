
"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-card/30 backdrop-blur-lg border border-border/10 text-center transition-all hover:border-primary/50">
        <CardHeader className="flex flex-col items-center justify-center pb-2">
          <div className="p-3 rounded-full bg-primary/20 text-primary mb-2">
            <Icon className="h-8 w-8" />
          </div>
          <CardTitle className="text-4xl font-black font-headline">{value}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-semibold">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
