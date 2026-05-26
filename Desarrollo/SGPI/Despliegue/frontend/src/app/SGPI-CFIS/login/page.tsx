'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/SGPI-CFU/lib/hooks/useAuth';
import { LoginForm } from '@/SGPI-CFU/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Si ya está autenticado, redirigir a /SGPI-CFB
    if (!isLoading && isAuthenticated) {
      router.replace('/SGPI-CFB');
    }
  }, [isAuthenticated, isLoading, router]);

  // Si está cargando el estado de autenticación, mostrar pantalla en blanco o spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-[#0f172a]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // Si no está autenticado, mostramos el login.
  // Como pide "Sin Sidebar ni TopBar", envolvemos el form en un contenedor de pantalla completa.
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <LoginForm />
    </main>
  );
}
