import React from 'react';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center font-headline ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path d="M40 40H8C6.89543 40 6 39.1046 6 38V13C6 11.3431 7.34315 10 9 10H39C40.6569 10 42 11.3431 42 13V38C42 39.1046 41.1046 40 40 40Z" fill="#F8F8F8"/>
        <path d="M24 10V40" stroke="#0A0A0A" strokeWidth="2"/>
        <circle cx="24" cy="24" r="9" fill="#4ADE80"/>
        <path d="M24 21V19M24 29V27M26 22C26 20.8954 25.1046 20 24 20C22.8954 20 22 20.8954 22 22C22 23.1046 22.8954 24 24 24C25.1046 24 26 24.8954 26 26C26 27.1046 25.1046 28 24 28C22.8954 28 22 27.1046 22 26" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M33 16L41 8" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
        <path d="M37 8H41V12" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <span className="text-2xl font-black text-foreground">centsable</span>
    </Link>
  );
}
