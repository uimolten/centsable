
"use client";

import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { GridBackground } from '@/components/grid-background';

function AuthPageContent() {
  return (
    <GridBackground className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <AuthForm />
      </div>
    </GridBackground>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageContent />
    </Suspense>
  )
}
