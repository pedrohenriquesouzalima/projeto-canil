// Tipos Auxiliares
export type Gender = 'MACHO' | 'FEMEA';
export type Origin = 'COMPRA' | 'NINHADA_INTERNA';
export type EnclosureStatus = 'DISPONIVEL' | 'LOTADO' | 'MANUTENCAO';

// Modelo de Vacina
export interface Vaccine {
  id: string;
  name: string;
  applicationDate: string;
  expirationDate: string;
  veterinarian: string;
}

// Modelo Principal: O Cão (Dog)
export interface Dog {
  id: string;
  name: string;
  breed: string;
  color: string;
  gender: Gender;
  origin: Origin;
  birthDate: string;
  lastHeatDate?: string | null; // Regra de negócio para fêmeas
  vaccines: Vaccine[];
  currentEnclosureId: string | null;
  createdAt: string;
}

// Modelo de Alojamento: A Baia (Enclosure)
export interface Enclosure {
  id: string;
  name: string;
  maxCapacity: number;
  status: EnclosureStatus;
  currentOccupants: string[]; // IDs dos cães presentes
}