/**
 * @file _data/types.ts
 * @description Tipos TypeScript del módulo de Publicaciones y Tesis (SGPI-CFPT).
 *
 * Endpoints futuros:
 *   GET  /api/v1/publicaciones                        → lista paginada con filtros
 *   GET  /api/v1/publicaciones/{id}                   → detalle
 *   POST /api/v1/publicaciones/{id}/confirmar         → confirmar y persistir
 *   PUT  /api/v1/publicaciones/{id}/vincular          → vincular a docente (EX1)
 *   GET  /api/v1/publicaciones/validar-doi?doi=...    → validación de duplicado (EX2)
 *   GET  /api/v1/investigadores?q=...                 → buscador para EX1
 */

// ─────────────────────────────────────────────────────────────────────────────
// Enumeraciones
// ─────────────────────────────────────────────────────────────────────────────

/** Tipo de producción académica */
export type TipoProduccion =
  | 'articulo'   // Artículos indexados (Scopus / WoS)
  | 'tesis';     // Tesis académicas (Cybertesis / repositorio)

/** Fuente de importación del registro */
export type FuenteOrigen =
  | 'SCOPUS'
  | 'WOS'
  | 'CYBERTESIS'
  | 'MANUAL';

/** Estado del ciclo de validación */
export type EstadoValidacion =
  | 'pendiente'   // Importado, aguardando confirmación
  | 'validado'    // Confirmado y persistido
  | 'rechazado';  // Descartado manualmente

/** Cuartil de indexación de revistas */
export type Cuartil = 'Q1' | 'Q2' | 'Q3' | 'Q4' | null;

// ─────────────────────────────────────────────────────────────────────────────
// Investigador/Docente (para vincular)
// ─────────────────────────────────────────────────────────────────────────────

export interface InvestigadorResumen {
  id:          string;
  nombre:      string;
  dni:         string;
  departamento: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Registro de producción (unifica artículo y tesis)
// ─────────────────────────────────────────────────────────────────────────────

export interface RegistroProduccion {
  id:                    string;
  tipo:                  TipoProduccion;
  titulo:                string;
  autores:               string;        // "R. Perez, J. Doe" — texto libre del import
  fecha:                 string;        // "YYYY-MM-DD"
  fuente:                FuenteOrigen;
  estado:                EstadoValidacion;

  // Metadatos de artículos (opcionales para tesis)
  revista?:              string;
  issn?:                 string;
  doi?:                  string;
  cuartil?:              Cuartil;

  // Metadatos de tesis (opcionales para artículos)
  tesista?:              string;
  asesorSugerido?:       InvestigadorResumen;
  asesorVinculado?:      InvestigadorResumen;
  tipoTesis?:            'Pregrado' | 'Maestría' | 'Doctorado';
  urlCybertesis?:        string;

  // Metadatos comunes de auditoría
  importadoEn?:          string;        // ISO datetime
  confirmadoPor?:        string;        // nombre del usuario
  confirmadoEn?:         string;        // ISO datetime
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtros de búsqueda
// ─────────────────────────────────────────────────────────────────────────────

export interface FiltrosProduccion {
  buscar:       string;
  tipo:         TipoProduccion | 'todos';
  estado:       EstadoValidacion | 'todos';
  indexacion:   FuenteOrigen | 'todas';
}

// ─────────────────────────────────────────────────────────────────────────────
// Payload de confirmación
// ─────────────────────────────────────────────────────────────────────────────

export interface ConfirmarPayload {
  id:             string;
  doi?:           string;   // editable antes de confirmar
  cuartil?:       Cuartil;  // editable antes de confirmar
  asesorId?:      string;   // ID del investigador vinculado (EX1)
}
