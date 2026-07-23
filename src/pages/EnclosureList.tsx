import React from 'react';
import { Dog, Enclosure } from '../types';

interface EnclosureListProps {
  dogs: Dog[];
  enclosures: Enclosure[];
}

export const EnclosureList: React.FC<EnclosureListProps> = ({ dogs, enclosures }) => {
  const getDogsInEnclosure = (occupantIds: string[]) => {
    return dogs.filter(dog => occupantIds.includes(dog.id));
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#0f172a' }}>Gestão de Alojamentos (Baias)</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {enclosures.map(enclosure => {
          const occupants = getDogsInEnclosure(enclosure.currentOccupants);
          const isFull = enclosure.currentOccupants.length >= enclosure.maxCapacity;

          return (
            <div 
              key={enclosure.id} 
              style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '1.25rem',
                backgroundColor: isFull ? '#fff0f0' : '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem' }}>{enclosure.name}</h4>
                <span style={{ 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  backgroundColor: isFull ? '#fee2e2' : '#dcfce7',
                  color: isFull ? '#991b1b' : '#166534'
                }}>
                  {isFull ? 'LOTADO' : 'DISPONÍVEL'}
                </span>
              </div>

              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                Ocupação: <strong>{enclosure.currentOccupants.length} / {enclosure.maxCapacity} cães</strong>
              </p>

              <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '0.75rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#475569' }}>Cães Alojados:</strong>
                {occupants.length > 0 ? (
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#334155' }}>
                    {occupants.map(dog => (
                      <li key={dog.id}>
                        <strong>{dog.name}</strong> ({dog.breed} - {dog.gender})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    Nenhum cão nesta baia no momento.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};