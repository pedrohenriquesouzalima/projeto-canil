import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{ 
      backgroundColor: '#1e293b', 
      color: '#ffffff', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
        🐕 CanilControl <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'normal' }}>MVP</span>
      </h1>
      <nav>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Painel do Criador</span>
      </nav>
    </header>
  );
};