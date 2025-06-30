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
        <path d="M39 10H9C7.89543 10 7 10.8954 7 12V38C14.6667 34 33.3333 34 41 38V12C41 10.8954 40.1046 10 39 10Z" fill="#F8F8F8"/>
        <path d="M7 38C14.6667 34 33.3333 34 41 38" stroke="#0A0A0A" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="11" fill="#4ADE80"/>
        <path d="M26.5 23C26.5 21.6193 25.3807 20.5 24 20.5C22.6193 20.5 21.5 21.6193 21.5 23C21.5 24.3807 22.6193 25.5 24 25.5C25.3807 25.5 26.5 26.6193 26.5 28" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M24 18V30" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M33 20L43 10" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round"/>
        <path d="M38 10H43V15" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-2xl font-black text-foreground">centsable</span>
    </Link>
  );
}
