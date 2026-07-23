import React from 'react';
import { Dog, Enclosure } from '../types';

interface DashboardProps {
  dogs: Dog[];
  enclosures: Enclosure[];
}

export const Dashboard: React.FC<DashboardProps> = ({ dogs, enclosures }) => {
  const totalDogs = dogs.length;
  const occupiedEnclosures = enclosures.filter(enc => enc.currentOccupants.length > 0).length;
  const today = new Date().toISOString().split('T')[0];

  const vaccineAlerts = dogs.flatMap(dog => 
    dog.vaccines.filter(vac => vac.expirationDate <= today).map(vac => ({
      dogName: dog.name,
      vaccineName: vac.name,
      expirationDate: vac.expirationDate
    }))
  );

  return (
    <main style={{ padding: '1.5rem 0', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '1.5rem' }}>Visão Geral do Canil</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Total de Cães Hospedados</h3>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{totalDogs}</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Baias Ativas em Uso</h3>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>
            {occupiedEnclosures} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ {enclosures.length}</span>
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Alertas Sanitários (Vacinas)</h3>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
            {vaccineAlerts.length}
          </p>
        </div>
      </div>

      {vaccineAlerts.length > 0 && (
        <section style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#991b1b', fontSize: '1.1rem' }}>⚠️ Atenção Sanitária Requerida</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#7f1d1d' }}>
            {vaccineAlerts.map((alert, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                O cão <strong>{alert.dogName}</strong> está com a vacina <strong>{alert.vaccineName}</strong> vencida/expirando (Data: {alert.expirationDate}).
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};