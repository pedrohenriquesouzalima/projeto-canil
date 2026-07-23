import React, { useState } from 'react';
import { Dog, Enclosure, Gender, Origin } from '../types';

interface DogFormProps {
  enclosures: Enclosure[];
  onAddDog: (newDog: Dog) => void;
}

export const DogForm: React.FC<DogFormProps> = ({ enclosures, onAddDog }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState<Gender>('MACHO');
  const [origin, setOrigin] = useState<Origin>('COMPRA');
  const [birthDate, setBirthDate] = useState('');
  const [lastHeatDate, setLastHeatDate] = useState('');
  const [enclosureId, setEnclosureId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !breed || !color || !birthDate || !enclosureId) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    // Trava de Segurança: Verificar se a baia selecionada já está cheia
    const targetEnclosure = enclosures.find(enc => enc.id === enclosureId);
    if (targetEnclosure && targetEnclosure.currentOccupants.length >= targetEnclosure.maxCapacity) {
      alert('⚠️ A baia selecionada atingiu a capacidade máxima!');
      return;
    }

    const newDog: Dog = {
      id: `d-${Date.now()}`,
      name,
      breed,
      color,
      gender,
      origin,
      birthDate,
      lastHeatDate: gender === 'FEMEA' ? lastHeatDate : undefined,
      currentEnclosureId: enclosureId,
      createdAt: new Date().toISOString().split('T')[0],
      vaccines: []
    };

    onAddDog(newDog);

    // Limpar formulário após envio
    setName('');
    setBreed('');
    setColor('');
    setBirthDate('');
    setLastHeatDate('');
    setEnclosureId('');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>➕ Cadastrar Novo Cão</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Nome *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Ex: Apollo" />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Raça *</label>
          <input type="text" value={breed} onChange={e => setBreed(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Ex: Rottweiler" />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Pelagem / Cor *</label>
          <input type="text" value={color} onChange={e => setColor(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Ex: Preto e Canela" />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Sexo *</label>
          <select value={gender} onChange={e => setGender(e.target.value as Gender)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
            <option value="MACHO">Macho</option>
            <option value="FEMEA">Fêmea</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Origem *</label>
          <select value={origin} onChange={e => setOrigin(e.target.value as Origin)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
            <option value="COMPRA">Compra Externa</option>
            <option value="NINHADA_INTERNA">Ninhada Interna</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Data de Nascimento *</label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        </div>

        {/* REGRA BIOLÓGICA: Exibe o campo apenas para FÊMEA */}
        {gender === 'FEMEA' && (
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#be185d', marginBottom: '0.25rem' }}>Data do Último Cio</label>
            <input type="date" value={lastHeatDate} onChange={e => setLastHeatDate(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #fbcfe8', backgroundColor: '#fdf2f8', boxSizing: 'border-box' }} />
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '0.25rem' }}>Alojamento (Baia) *</label>
          <select value={enclosureId} onChange={e => setEnclosureId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
            <option value="">Selecione uma baia...</option>
            {enclosures.map(enc => {
              const isFull = enc.currentOccupants.length >= enc.maxCapacity;
              return (
                <option key={enc.id} value={enc.id} disabled={isFull}>
                  {enc.name} ({enc.currentOccupants.length}/{enc.maxCapacity}) {isFull ? '- LOTADA' : ''}
                </option>
              );
            })}
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
          <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Salvar Cadastro
          </button>
        </div>
      </form>
    </div>
  );
};