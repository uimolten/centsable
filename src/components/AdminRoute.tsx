
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Verifying permissions...</p>
      </div>
    );
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  return null;
};
