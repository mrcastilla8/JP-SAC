/**
 * @file _data/mock.ts
 * @description Datos mock del módulo de Docentes/Investigadores.
 * Reemplazar con GET /api/v1/docentes.
 */

import type { DocenteInvestigador, StatsDocentes } from './types';

const CURRENT_YEAR = new Date().getFullYear();

// ─────────────────────────────────────────────────────────────────────────────
// Catálogos
// ─────────────────────────────────────────────────────────────────────────────

export const DEPARTAMENTOS = [
  'Biología Celular',
  'Física Teórica',
  'Química Orgánica',
  'Genética',
  'Ingeniería de Sistemas',
  'Ingeniería de Software',
  'Ciencias de la Computación',
  'Matemáticas Aplicadas',
  'Ingeniería Eléctrica',
  'Biotecnología',
];

export const NIVELES_RENACYT = [
  'NIVEL I', 'NIVEL II', 'NIVEL III', 'NIVEL IV',
  'NIVEL V', 'NIVEL VI', 'NIVEL VII', 'DISTINGUIDO', 'Sin nivel',
];

// Genera historial de los últimos 7 años con datos variados
function genHistorial(base: number): DocenteInvestigador['puntajeHistorico'] {
  return Array.from({ length: 7 }, (_, i) => {
    const anio = CURRENT_YEAR - 6 + i;
    const art  = Math.max(0, Math.round(base + (Math.random() - 0.5) * 4));
    const tes  = Math.max(0, Math.round(base * 0.6 + (Math.random() - 0.5) * 2));
    const pro  = Math.max(0, Math.round(base * 0.4 + (Math.random() - 0.5) * 2));
    return { anio, articulos: art, tesis: tes, proyectos: pro, puntaje: art * 3 + tes * 2 + pro };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 20 docentes de muestra
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_DOCENTES: DocenteInvestigador[] = [
  {
    id: 'DOC-001', nombres: 'María Elena', apellidos: 'Alvarado Rivas',
    dni: '10458293', email: 'malvela@unmsm.edu.pe',
    departamento: 'Biología Celular', nivelRenacyt: 'NIVEL II',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2027-08-31',
    codigoDocente: 'D-0041', puntajeHistorico: genHistorial(5),
    creadoEn: '2020-03-15', actualizadoEn: '2026-01-10',
  },
  {
    id: 'DOC-002', nombres: 'Jorge Luis', apellidos: 'Castro Mendieta',
    dni: '09873421', email: 'jcastrcm@unmsm.edu.pe',
    departamento: 'Física Teórica', nivelRenacyt: 'DISTINGUIDO',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2028-12-31',
    codigoDocente: 'D-0017', puntajeHistorico: genHistorial(9),
    creadoEn: '2018-07-01', actualizadoEn: '2025-11-20',
  },
  {
    id: 'DOC-003', nombres: 'Carmen Rosa', apellidos: 'Zavala Rojas',
    dni: '41223344', email: 'czavalar@unmsm.edu.pe',
    departamento: 'Química Orgánica', nivelRenacyt: 'NIVEL I',
    condicionSM: 'No SM', estado: 'inactivo', fechaVigencia: '2024-06-30',
    codigoDocente: 'D-0093', puntajeHistorico: genHistorial(2),
    creadoEn: '2021-09-10', actualizadoEn: '2024-07-01',
  },
  {
    id: 'DOC-004', nombres: 'Fernando', apellidos: 'Gomez Sanchez',
    dni: '25884712', email: 'fgomezs@unmsm.edu.pe',
    departamento: 'Genética', nivelRenacyt: 'NIVEL III',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2027-03-31',
    codigoDocente: 'D-0058', puntajeHistorico: genHistorial(6),
    creadoEn: '2019-02-20', actualizadoEn: '2025-08-15',
  },
  {
    id: 'DOC-005', nombres: 'Rosa Amelia', apellidos: 'Perez Torres',
    dni: '08459231', email: 'raperez@unmsm.edu.pe',
    departamento: 'Ingeniería de Sistemas', nivelRenacyt: 'NIVEL IV',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2026-09-30',
    codigoDocente: 'D-0012', puntajeHistorico: genHistorial(7),
    creadoEn: '2017-04-01', actualizadoEn: '2026-02-28',
  },
  {
    id: 'DOC-006', nombres: 'Luis Alberto', apellidos: 'Gomez Llanos',
    dni: '40596871', email: 'lagomez@unmsm.edu.pe',
    departamento: 'Ingeniería de Software', nivelRenacyt: 'NIVEL II',
    condicionSM: 'No SM', estado: 'por_vencer', fechaVigencia: `${CURRENT_YEAR}-08-15`,
    codigoDocente: 'D-0073', puntajeHistorico: genHistorial(4),
    creadoEn: '2022-01-15', actualizadoEn: '2025-12-01',
  },
  {
    id: 'DOC-007', nombres: 'Alejandro', apellidos: 'Silva Ramirez',
    dni: '18293847', email: 'asilva@unmsm.edu.pe',
    departamento: 'Ciencias de la Computación', nivelRenacyt: 'NIVEL V',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2029-01-31',
    codigoDocente: 'D-0034', puntajeHistorico: genHistorial(8),
    creadoEn: '2016-08-10', actualizadoEn: '2025-09-05',
  },
  {
    id: 'DOC-008', nombres: 'Carlos Enrique', apellidos: 'Mendoza Torres',
    dni: '42385912', email: 'cmendoza@unmsm.edu.pe',
    departamento: 'Ingeniería de Sistemas', nivelRenacyt: 'NIVEL III',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2027-10-31',
    codigoDocente: 'D-0061', puntajeHistorico: genHistorial(5),
    creadoEn: '2020-06-01', actualizadoEn: '2026-01-20',
  },
  {
    id: 'DOC-009', nombres: 'Pedro Manuel', apellidos: 'Flores Cano',
    dni: '29384756', email: 'pflores@unmsm.edu.pe',
    departamento: 'Ingeniería de Software', nivelRenacyt: 'NIVEL I',
    condicionSM: 'No SM', estado: 'activo', fechaVigencia: '2026-11-30',
    codigoDocente: 'D-0089', puntajeHistorico: genHistorial(2),
    creadoEn: '2023-03-01', actualizadoEn: '2025-10-15',
  },
  {
    id: 'DOC-010', nombres: 'Julia Marisol', apellidos: 'Quispe Mamani',
    dni: '31928475', email: 'jquispe@unmsm.edu.pe',
    departamento: 'Ciencias de la Computación', nivelRenacyt: 'NIVEL II',
    condicionSM: 'SM', estado: 'por_vencer', fechaVigencia: `${CURRENT_YEAR}-07-20`,
    codigoDocente: 'D-0105', puntajeHistorico: genHistorial(4),
    creadoEn: '2021-11-01', actualizadoEn: '2025-06-01',
  },
  {
    id: 'DOC-011', nombres: 'Miguel Angel', apellidos: 'Torres Vargas',
    dni: '10293847', email: 'mtorres@unmsm.edu.pe',
    departamento: 'Matemáticas Aplicadas', nivelRenacyt: 'NIVEL VI',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2030-05-31',
    codigoDocente: 'D-0008', puntajeHistorico: genHistorial(10),
    creadoEn: '2015-01-10', actualizadoEn: '2025-07-30',
  },
  {
    id: 'DOC-012', nombres: 'Marco Antonio', apellidos: 'Rojas Calla',
    dni: '55647382', email: 'mrojas@unmsm.edu.pe',
    departamento: 'Ingeniería de Software', nivelRenacyt: 'NIVEL II',
    condicionSM: 'No SM', estado: 'inactivo', fechaVigencia: '2025-01-31',
    codigoDocente: 'D-0117', puntajeHistorico: genHistorial(3),
    creadoEn: '2022-05-20', actualizadoEn: '2025-02-01',
  },
  {
    id: 'DOC-013', nombres: 'Beatriz', apellidos: 'Salinas Paredes',
    dni: '73849201', email: 'bsalinas@unmsm.edu.pe',
    departamento: 'Biotecnología', nivelRenacyt: 'NIVEL IV',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2028-04-30',
    codigoDocente: 'D-0022', puntajeHistorico: genHistorial(7),
    creadoEn: '2018-09-15', actualizadoEn: '2025-11-01',
  },
  {
    id: 'DOC-014', nombres: 'Ernesto Abel', apellidos: 'Castillo Ruiz',
    dni: '62738491', email: 'ecastillo@unmsm.edu.pe',
    departamento: 'Física Teórica', nivelRenacyt: 'NIVEL III',
    condicionSM: 'SM', estado: 'activo', fechaVigencia: '2027-12-31',
    codigoDocente: 'D-0045', puntajeHistorico: genHistorial(5),
    creadoEn: '2019-08-01', actualizadoEn: '2025-09-20',
  },
  {
    id: 'DOC-015', nombres: 'Diana Luz', apellidos: 'Morales Cruz',
    dni: '84736291', email: 'dmorales@unmsm.edu.pe',
    departamento: 'Biología Celular', nivelRenacyt: 'Sin nivel',
    condicionSM: 'No SM', estado: 'activo',
    codigoDocente: 'D-0132', puntajeHistorico: genHistorial(1),
    creadoEn: '2024-02-10', actualizadoEn: '2025-10-05',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// KPIs del tablero
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_STATS: StatsDocentes = {
  totalDocentes:         482,
  deltaEsteMes:          12,
  investigadoresRenacyt: 315,
  porcentajeRenacyt:     65,
  vigenciasPorVencer:    24,
  proyectosActivos:      1054,
  cicloAcademico:        '2024-I',
};
