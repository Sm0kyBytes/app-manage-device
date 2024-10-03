'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToLogin = async () => {
      await router.push('/login');
    };

    redirectToLogin();
  }, [router]);

  return null;
};

export default Index;
