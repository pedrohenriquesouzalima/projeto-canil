import React, { useState } from 'react';
import { Dog, Enclosure, Gender } from '../types';

interface DogListProps {
  dogs: Dog[];
  enclosures: Enclosure[];
}

export const DogList: React.FC<DogListProps> = ({ dogs, enclosures }) => {
  const [genderFilter, setGenderFilter] = useState<Gender | 'TODOS'>('TODOS');

  const filteredDogs = dogs.filter(dog => {
    if (genderFilter !== 'TODOS' && dog.gender !== genderFilter) return false;
    return true;
  });

  const getEnclosureName = (enclosureId: string | null) => {
    if (!enclosureId) return 'Sem Baia (Trânsito)';
    const found = enclosures.find(e => e.id === enclosureId);
    return found ? found.name : 'Não encontrada';
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: '#0f172a' }}>Plantel de Cães ({filteredDogs.length})</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold' }}>Filtrar Sexo:</label>
          <select 
            value={genderFilter} 
            onChange={(e) => setGenderFilter(e.target.value as Gender | 'TODOS')}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          >
            <option value="TODOS">Todos</option>
            <option value="MACHO">Machos</option>
            <option value="FEMEA">Fêmeas</option>
          </select>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '0.75rem' }}>Nome</th>
            <th style={{ padding: '0.75rem' }}>Raça / Pelagem</th>
            <th style={{ padding: '0.75rem' }}>Sexo</th>
            <th style={{ padding: '0.75rem' }}>Origem</th>
            <th style={{ padding: '0.75rem' }}>Alojamento Atual</th>
            <th style={{ padding: '0.75rem' }}>Último Cio</th>
          </tr>
        </thead>
        <tbody>
          {filteredDogs.map(dog => (
            <tr key={dog.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#1e293b' }}>{dog.name}</td>
              <td style={{ padding: '0.75rem', color: '#475569' }}>
                {dog.breed} <br />
                <small style={{ color: '#94a3b8' }}>{dog.color}</small>
              </td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{ 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold',
                  backgroundColor: dog.gender === 'FEMEA' ? '#fce7f3' : '#dbeafe',
                  color: dog.gender === 'FEMEA' ? '#be185d' : '#1e40af'
                }}>
                  {dog.gender}
                </span>
              </td>
              <td style={{ padding: '0.75rem', color: '#475569' }}>
                {dog.origin === 'COMPRA' ? '🛒 Compra Externa' : '🏠 Ninhada Interna'}
              </td>
              <td style={{ padding: '0.75rem', color: '#0284c7', fontWeight: '500' }}>
                {getEnclosureName(dog.currentEnclosureId)}
              </td>
              <td style={{ padding: '0.75rem', color: '#475569' }}>
                {dog.gender === 'FEMEA' ? (dog.lastHeatDate || 'Não registrado') : 'N/A (Macho)'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};