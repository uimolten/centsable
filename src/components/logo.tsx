import React from 'react';
import Link from 'next/link';

export function Logo({ className, onClick }: { className?: string, onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center font-headline ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(145, 63%, 45%)', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="hsl(var(--primary))" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M14 34C16.5 24 24 16.5 34 14L32 24L24 32L14 34Z" fill="url(#arrowGradient)" filter="url(#shadow)" />
        <circle cx="24" cy="24" r="14" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <path d="M24 18V30" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 21L28 27" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 27L28 21" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span className="text-2xl font-black text-foreground">centsable</span>
    </Link>
  );
}