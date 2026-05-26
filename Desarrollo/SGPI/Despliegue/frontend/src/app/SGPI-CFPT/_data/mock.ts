/**
 * @file _data/mock.ts
 * @description Datos mock del módulo de Publicaciones y Tesis.
 * Reemplazar con respuestas reales de GET /api/v1/publicaciones.
 */

import type { RegistroProduccion, InvestigadorResumen } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Investigadores disponibles para vincular (búsqueda EX1)
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_INVESTIGADORES: InvestigadorResumen[] = [
  { id: 'INV-001', nombre: 'Perez Torres, Roberto',    dni: '08459231', departamento: 'Ingeniería de Sistemas' },
  { id: 'INV-002', nombre: 'Gomez Llanos, Luis',       dni: '40596871', departamento: 'Ingeniería de Software' },
  { id: 'INV-003', nombre: 'Silva Ramirez, Alejandro', dni: '18293847', departamento: 'Ciencias de la Computación' },
  { id: 'INV-004', nombre: 'Mendoza Torres, Carlos',   dni: '42385912', departamento: 'Ingeniería de Sistemas' },
  { id: 'INV-005', nombre: 'Flores Cano, Pedro',       dni: '29384756', departamento: 'Ingeniería de Software' },
  { id: 'INV-006', nombre: 'Quispe Mamani, Julia',     dni: '31928475', departamento: 'Ciencias de la Computación' },
  { id: 'INV-007', nombre: 'Torres Vargas, Miguel',    dni: '10293847', departamento: 'Ingeniería de Sistemas' },
  { id: 'INV-008', nombre: 'Rojas Calla, Marco',       dni: '55647382', departamento: 'Ingeniería de Software' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registros de producción
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_PRODUCCIONES: RegistroProduccion[] = [
  // ── Artículos Pendientes ────────────────────────────────────────────────────
  {
    id:            'PROD-001',
    tipo:          'articulo',
    titulo:        'Machine Learning Models for Healthcare Analytics in Developing Countries',
    autores:       'R. Perez, J. Doe',
    fecha:         '2026-04-15',
    fuente:        'SCOPUS',
    estado:        'pendiente',
    revista:       'Journal of Medical Informatics',
    issn:          '1386-5056',
    doi:           '10.1016/j.jbi.2026.104231',
    cuartil:       'Q1',
    importadoEn:   '2026-05-20T08:15:00Z',
  },
  {
    id:            'PROD-002',
    tipo:          'articulo',
    titulo:        'Arquitectura de microservicios para gestión académica universitaria',
    autores:       'L. Gomez',
    fecha:         '2026-05-10',
    fuente:        'CYBERTESIS',
    estado:        'pendiente',
    revista:       'Repositorio UNMSM',
    doi:           '',
    cuartil:       null,
    importadoEn:   '2026-05-22T09:00:00Z',
  },
  {
    id:            'PROD-003',
    tipo:          'articulo',
    titulo:        'IoT Security Frameworks in Smart Cities: A Systematic Review',
    autores:       'A. Silva',
    fecha:         '2026-02-02',
    fuente:        'WOS',
    estado:        'validado',
    revista:       'IEEE Internet of Things Journal',
    issn:          '2327-4662',
    doi:           '10.1109/jiot.2026.3041123',
    cuartil:       'Q1',
    confirmadoPor: 'Ana Mendoza',
    confirmadoEn:  '2026-05-10T14:30:00Z',
    importadoEn:   '2026-05-08T11:00:00Z',
  },
  {
    id:            'PROD-004',
    tipo:          'articulo',
    titulo:        'Deep Learning for Early Detection of Diabetic Retinopathy',
    autores:       'C. Mendoza, P. Flores',
    fecha:         '2026-03-18',
    fuente:        'SCOPUS',
    estado:        'pendiente',
    revista:       'Computers in Biology and Medicine',
    issn:          '0010-4825',
    doi:           '10.1016/j.compbiomed.2026.106012',
    cuartil:       'Q2',
    importadoEn:   '2026-05-21T07:45:00Z',
  },
  {
    id:            'PROD-005',
    tipo:          'articulo',
    titulo:        'Blockchain-Based Academic Credential Verification System',
    autores:       'M. Torres, J. Quispe',
    fecha:         '2025-12-01',
    fuente:        'WOS',
    estado:        'validado',
    revista:       'Future Generation Computer Systems',
    issn:          '0167-739X',
    doi:           '10.1016/j.future.2025.11.009',
    cuartil:       'Q1',
    confirmadoPor: 'Ana Mendoza',
    confirmadoEn:  '2026-01-15T10:00:00Z',
    importadoEn:   '2026-01-10T08:30:00Z',
  },

  // ── Tesis Pendientes ────────────────────────────────────────────────────────
  {
    id:            'PROD-006',
    tipo:          'tesis',
    titulo:        'Sistema de recomendación de tesis basado en redes neuronales para la UNMSM',
    autores:       'García Paredes, Kevin Rodrigo',
    fecha:         '2026-04-20',
    fuente:        'CYBERTESIS',
    estado:        'pendiente',
    tesista:       'García Paredes, Kevin Rodrigo',
    asesorSugerido: MOCK_INVESTIGADORES[1], // Gomez Llanos, Luis
    tipoTesis:     'Pregrado',
    urlCybertesis: 'https://cybertesis.unmsm.edu.pe/handle/20.500.12672/19834',
    importadoEn:   '2026-05-23T10:30:00Z',
  },
  {
    id:            'PROD-007',
    tipo:          'tesis',
    titulo:        'Implementación de modelos de IA para clasificación de enfermedades dermatológicas',
    autores:       'Quispe Mamani, Sandra',
    fecha:         '2026-03-05',
    fuente:        'CYBERTESIS',
    estado:        'pendiente',
    tesista:       'Quispe Mamani, Sandra',
    asesorSugerido: MOCK_INVESTIGADORES[0], // Perez Torres, Roberto
    tipoTesis:     'Maestría',
    urlCybertesis: 'https://cybertesis.unmsm.edu.pe/handle/20.500.12672/19901',
    importadoEn:   '2026-05-24T09:00:00Z',
  },
  {
    id:            'PROD-008',
    tipo:          'tesis',
    titulo:        'Arquitectura distribuida para el procesamiento de big data en tiempo real',
    autores:       'Ccori Mamani, Renato',
    fecha:         '2025-11-14',
    fuente:        'CYBERTESIS',
    estado:        'validado',
    tesista:       'Ccori Mamani, Renato',
    asesorVinculado: MOCK_INVESTIGADORES[2], // Silva Ramirez, Alejandro
    tipoTesis:     'Doctorado',
    urlCybertesis: 'https://cybertesis.unmsm.edu.pe/handle/20.500.12672/18756',
    confirmadoPor: 'Ana Mendoza',
    confirmadoEn:  '2026-02-01T11:00:00Z',
    importadoEn:   '2025-12-01T08:00:00Z',
  },
];
