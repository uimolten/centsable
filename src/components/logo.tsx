
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className, onClick }: { className?: string, onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center font-headline ${className}`}>
      <Image
        src="/images/centsable.svg"
        alt="Centsable Logo"
        width={36}
        height={36}
        className="mr-2"
        priority
      />
      <span className="text-2xl font-black text-foreground">centsable</span>
    </Link>
  );
}
