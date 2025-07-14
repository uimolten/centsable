"use client";

import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { GridBackground } from '@/components/grid-background';

function AuthPageContent() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4">
      <GridBackground>
        <div className="relative z-10 w-full max-w-md">
          <AuthForm />
        </div>
      </GridBackground>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageContent />
    </Suspense>
  )
}
