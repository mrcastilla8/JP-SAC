/**
 * @file _data/service.ts
 * @description Capa de servicio del módulo de Docentes/Investigadores (SGPI-CFMH).
 *
 * Para conectar al backend real:
 *   1. Descomentar los bloques REAL API y eliminar los bloques MOCK.
 *
 * Endpoints documentados:
 *   GET    /api/v1/docentes                   → listado paginado
 *   GET    /api/v1/docentes/{id}              → perfil completo
 *   POST   /api/v1/docentes                   → crear
 *   PUT    /api/v1/docentes/{id}              → actualizar
 *   GET    /api/v1/docentes/validar-dni?dni=  → EX1
 *   GET    /api/v1/docentes/stats             → KPIs
 */

import type {
  DocenteInvestigador, FiltrosDocentes, DocentePayload, StatsDocentes,
} from './types';
import { MOCK_DOCENTES, MOCK_STATS } from './mock';

const PAGE_SIZE = 10;

// ─────────────────────────────────────────────────────────────────────────────
// Listado paginado
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginatedDocentes {
  items:  DocenteInvestigador[];
  total:  number;
  page:   number;
  pages:  number;
}

export async function getDocentes(
  filtros: FiltrosDocentes,
  page: number = 1,
): Promise<PaginatedDocentes> {
  /* ── REAL API ──────────────────────────────────────────────────────────────
  const params = new URLSearchParams({
    q:            filtros.buscar,
    departamento: filtros.departamento,
    nivel:        filtros.nivelRenacyt,
    estado:       filtros.estado,
    page:         String(page),
    pageSize:     String(PAGE_SIZE),
  });
  const res = await fetch(`/api/v1/docentes?${params}`);
  if (!res.ok) throw new Error('Error al cargar docentes.');
  return res.json();
  ──────────────────────────────────────────────────────────────────────── */

  await new Promise((r) => setTimeout(r, 350));

  let list = [...MOCK_DOCENTES];

  if (filtros.buscar.trim()) {
    const q = filtros.buscar.toLowerCase();
    list = list.filter(
      (d) =>
        d.nombres.toLowerCase().includes(q) ||
        d.apellidos.toLowerCase().includes(q) ||
        d.dni.includes(q) ||
        d.email.toLowerCase().includes(q),
    );
  }
  if (filtros.departamento) list = list.filter((d) => d.departamento === filtros.departamento);
  if (filtros.nivelRenacyt) list = list.filter((d) => d.nivelRenacyt === filtros.nivelRenacyt);
  if (filtros.estado)       list = list.filter((d) => d.estado === filtros.estado);

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  return { items: list.slice(start, start + PAGE_SIZE), total, page, pages };
}

// ─────────────────────────────────────────────────────────────────────────────
// Obtener perfil por ID
// ─────────────────────────────────────────────────────────────────────────────

export async function getDocenteById(id: string): Promise<DocenteInvestigador | null> {
  /* ── REAL API ──────────────────────────────────────────────────────────────
  const res = await fetch(`/api/v1/docentes/${id}`);
  if (!res.ok) return null;
  return res.json();
  ──────────────────────────────────────────────────────────────────────── */

  await new Promise((r) => setTimeout(r, 200));
  return MOCK_DOCENTES.find((d) => d.id === id) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Crear docente
// ─────────────────────────────────────────────────────────────────────────────

export async function crearDocente(payload: DocentePayload): Promise<DocenteInvestigador> {
  /* ── REAL API ──────────────────────────────────────────────────────────────
  const res = await fetch('/api/v1/docentes', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al registrar el docente.');
  return res.json();
  ──────────────────────────────────────────────────────────────────────── */

  await new Promise((r) => setTimeout(r, 600));

  const nuevo: DocenteInvestigador = {
    ...payload,
    id:           `DOC-${Date.now()}`,
    creadoEn:     new Date().toISOString(),
    actualizadoEn: new Date().toISOString(),
  };
  MOCK_DOCENTES.unshift(nuevo);
  return nuevo;
}

// ─────────────────────────────────────────────────────────────────────────────
// Actualizar docente
// ─────────────────────────────────────────────────────────────────────────────

export async function actualizarDocente(
  id: string,
  payload: DocentePayload,
): Promise<DocenteInvestigador> {
  /* ── REAL API ──────────────────────────────────────────────────────────────
  const res = await fetch(`/api/v1/docentes/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al actualizar el docente.');
  return res.json();
  ──────────────────────────────────────────────────────────────────────── */

  await new Promise((r) => setTimeout(r, 600));

  const idx = MOCK_DOCENTES.findIndex((d) => d.id === id);
  if (idx === -1) throw new Error('Docente no encontrado.');

  const updated: DocenteInvestigador = {
    ...MOCK_DOCENTES[idx],
    ...payload,
    id,
    actualizadoEn: new Date().toISOString(),
  };
  MOCK_DOCENTES[idx] = updated;
  return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// Validar unicidad de DNI — EX1
// ─────────────────────────────────────────────────────────────────────────────

export async function validarDNI(
  dni: string,
  excluirId?: string,
): Promise<{ duplicado: boolean; existenteId?: string }> {
  /* ── REAL API ──────────────────────────────────────────────────────────────
  const url = `/api/v1/docentes/validar-dni?dni=${encodeURIComponent(dni)}${excluirId ? `&excluir=${excluirId}` : ''}`;
  const res = await fetch(url);
  return res.json();
  ──────────────────────────────────────────────────────────────────────── */

  await new Promise((r) => setTimeout(r, 150));
  const existente = MOCK_DOCENTES.find(
    (d) => d.dni === dni && d.id !== excluirId,
  );
  return { duplicado: !!existente, existenteId: existente?.id };
}

// ─────────────────────────────────────────────────────────────────────────────
// KPIs del tablero
// ─────────────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<StatsDocentes> {
  /* ── REAL API ──────────────────────────────────────────────────────────────
  const res = await fetch('/api/v1/docentes/stats');
  return res.json();
  ──────────────────────────────────────────────────────────────────────── */

  await new Promise((r) => setTimeout(r, 200));
  return MOCK_STATS;
}
