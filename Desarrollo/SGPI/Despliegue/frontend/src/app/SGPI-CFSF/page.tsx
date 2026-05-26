'use client';

import React from 'react';
import { MainLayout } from '@/SGPI-CFU/components/layout';
import { PageHeader } from '@/SGPI-CFU/components/shared';

export default function SincronizacionDeFuentesPage() {
  return (
    <MainLayout
      title="Sistema de Gestión de Proyectos de Investigación"
      subtitle=""
    >
      <PageHeader
        title="Sincronización de Fuentes"
        description="Pantalla principal para la sincronización de fuentes externas con el sistema SGPI."
      />
      
      {/* Contenido placeholder */}
      <div className="bg-white border border-[#e2e8f0] rounded p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] mt-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        <p className="font-sans font-semibold text-[15px] text-on-surface mb-1">
          Sincronización de Fuentes
        </p>
      </div>
    </MainLayout>
  );
}
