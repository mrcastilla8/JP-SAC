'use client';

/**
 * @file Sidebar.tsx
 * @description Sidebar de navegación del SGPI — Navy fijo a la izquierda.
 *
 * - Ancho fijo de 220px, 100vh, position fixed
 * - Brand SGPI en la cabecera
 * - NavItems filtrados por rol (RBAC)
 * - Item activo con fondo primary-container + borde izquierdo accent
 * - Botón de Cerrar Sesión en el footer
 * - Fuentes: IBM Plex Sans (brand) · Inter (nav)
 */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../lib/hooks/useAuth';
import type { UserRole } from '../../lib/types/auth';

// ─────────────────────────────────────────────────────────────────────────────
// Íconos SVG inline (outline, 18×18, stroke-2)
// ─────────────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SyncIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

const ImportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6"  y1="20" x2="6"  y2="14"/>
    <line x1="2"  y1="20" x2="22" y2="20"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Definición de items de navegación
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  id:         string;
  label:      string;
  href:       string;
  icon:       React.FC;
  /** Roles que pueden ver este item. undefined = todos. */
  roles?:     UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id:    'search',
    label: 'Búsqueda Global',
    href:  '/search',
    icon:  SearchIcon,
    // Todos los roles
  },
  {
    id:    'projects',
    label: 'Proyectos',
    href:  '/projects',
    icon:  FolderIcon,
  },
  {
    id:    'investigators',
    label: 'Docentes/Inv.',
    href:  '/investigators',
    icon:  UserIcon,
  },
  {
    id:    'groups',
    label: 'Grupos de Inv.',
    href:  '/groups',
    icon:  UsersIcon,
  },
  {
    id:    'sync',
    label: 'Sincronización',
    href:  '/sync',
    icon:  SyncIcon,
    roles: ['admin'],
  },
  {
    id:    'import',
    label: 'Importación de datos',
    href:  '/import',
    icon:  ImportIcon,
    roles: ['admin', 'secretary'],
  },
  {
    id:    'calls',
    label: 'Alertas Convocatorias',
    href:  '/calls',
    icon:  BellIcon,
    roles: ['admin', 'secretary', 'chief'],
  },
  {
    id:    'publications',
    label: 'Publicaciones y Tesis',
    href:  '/publications',
    icon:  BookIcon,
  },
  {
    id:    'reports',
    label: 'Reportes',
    href:  '/reports',
    icon:  ChartIcon,
    roles: ['admin', 'secretary', 'chief'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  /** Filtra los items visibles según el rol del usuario */
  const visibleItems = NAV_ITEMS.filter((item) => {
    if (!item.roles) return true;              // sin restricción → visible para todos
    if (!user?.role) return false;            // no autenticado → ocultar
    return item.roles.includes(user.role);
  });

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside
      className="
        fixed left-0 top-0 z-40
        flex flex-col
        h-screen w-[220px]
        bg-primary text-on-primary
        border-r border-[#1a3050]
        select-none
      "
      aria-label="Navegación principal del SGPI"
    >
      {/* ── BRAND ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 px-4 pt-5 pb-4 border-b border-[#1a3050]">
        {/* Logo institucional */}
        <div className="
          flex items-center justify-center flex-shrink-0
          w-9 h-9 rounded
          bg-[#002b54] text-[#7493c2]
          border border-[#264872]
        ">
          <ShieldIcon />
        </div>

        {/* Texto de marca */}
        <div className="min-w-0">
          <p className="font-heading font-semibold text-white text-[15px] leading-tight tracking-tight">
            SGPI
          </p>
          <p className="font-sans text-[10px] leading-[14px] text-[#7493c2] mt-0.5 line-clamp-2">
            Sistema de Gestión de Proyectos de Investigación
          </p>
        </div>
      </div>

      {/* ── NAV ITEMS ─────────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Módulos del sistema">
        <ul className="space-y-0.5">
          {visibleItems.map((item) => {
            const Icon    = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    group flex items-center gap-3
                    px-3 py-2 rounded
                    text-[13px] font-sans font-normal leading-5
                    transition-colors duration-100
                    ${isActive
                      ? 'bg-[#002b54] text-white border-l-2 border-[#a8c8fa] pl-[10px]'
                      : 'text-[#a8c8fa] hover:bg-[#0d2440] hover:text-white border-l-2 border-transparent pl-[10px]'
                    }
                  `}
                >
                  {/* Ícono */}
                  <span className={`
                    flex-shrink-0
                    ${isActive ? 'text-[#a8c8fa]' : 'text-[#7493c2] group-hover:text-[#a8c8fa]'}
                    transition-colors duration-100
                  `}>
                    <Icon />
                  </span>

                  {/* Label */}
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── FOOTER — Usuario + Logout ──────────────────────────────────────── */}
      <div className="px-2 py-3 border-t border-[#1a3050] space-y-1">
        {/* Info del usuario autenticado */}
        {user && (
          <div className="px-3 py-2 rounded bg-[#0d2440]">
            <p className="font-sans text-[11px] font-semibold text-white truncate leading-4">
              {user.name}
            </p>
            <p className="font-sans text-[10px] text-[#7493c2] truncate leading-4 mt-px capitalize">
              {user.role === 'admin'     ? 'Administrador'
               : user.role === 'secretary' ? 'Secretaria'
               : user.role === 'chief'     ? 'Jefe del Instituto'
               : 'Consulta'}
            </p>
          </div>
        )}

        {/* Botón Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="
            group flex items-center gap-3
            w-full px-3 py-2 rounded
            text-[13px] font-sans font-normal leading-5
            text-[#7493c2] hover:text-[#ffdad6] hover:bg-[#3b0808]
            border-l-2 border-transparent pl-[10px]
            transition-colors duration-100
          "
          aria-label="Cerrar sesión"
          type="button"
        >
          <span className="flex-shrink-0 transition-colors duration-100">
            <LogoutIcon />
          </span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
