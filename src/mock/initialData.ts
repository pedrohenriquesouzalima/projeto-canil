import { Dog, Enclosure } from '../types';

export const INITIAL_ENCLOSURES: Enclosure[] = [
  {
    id: 'b-1',
    name: 'Baia Maternidade 01',
    maxCapacity: 2,
    status: 'DISPONIVEL',
    currentOccupants: ['d-1']
  },
  {
    id: 'b-2',
    name: 'Alojamento Machos Alpha',
    maxCapacity: 3,
    status: 'DISPONIVEL',
    currentOccupants: ['d-2']
  },
  {
    id: 'b-3',
    name: 'Solário Fêmeas',
    maxCapacity: 2,
    status: 'DISPONIVEL',
    currentOccupants: []
  }
];

export const INITIAL_DOGS: Dog[] = [
  {
    id: 'd-1',
    name: 'Luna',
    breed: 'Golden Retriever',
    color: 'Dourado',
    gender: 'FEMEA',
    origin: 'NINHADA_INTERNA',
    birthDate: '2023-05-10',
    lastHeatDate: '2026-06-15', // Cerca de 1 mês atrás
    currentEnclosureId: 'b-1',
    createdAt: '2023-05-10',
    vaccines: [
      {
        id: 'v-1',
        name: 'V10',
        applicationDate: '2025-08-10',
        expirationDate: '2026-08-10', // Vence em breve!
        veterinarian: 'Dra. Ana Silva'
      }
    ]
  },
  {
    id: 'd-2',
    name: 'Thor',
    breed: 'Pastor Alemão',
    color: 'Capa Preta',
    gender: 'MACHO',
    origin: 'COMPRA',
    birthDate: '2022-01-20',
    currentEnclosureId: 'b-2',
    createdAt: '2024-02-01',
    vaccines: [
      {
        id: 'v-2',
        name: 'Raiva',
        applicationDate: '2025-01-15',
        expirationDate: '2026-01-15', // Já Vencida!
        veterinarian: 'Dr. Carlos'
      }
    ]
  }
];