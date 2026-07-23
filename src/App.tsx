import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { DogList } from './pages/DogList';
import { EnclosureList } from './pages/EnclosureList';
import { DogForm } from './components/DogForm';
import { INITIAL_DOGS, INITIAL_ENCLOSURES } from './mock/initialData';
import { Dog, Enclosure } from './types';

function App() {
  // Carrega do LocalStorage ou usa o mock inicial
  const [dogs, setDogs] = useState<Dog[]>(() => {
    const saved = localStorage.getItem('@canil:dogs');
    return saved ? JSON.parse(saved) : INITIAL_DOGS;
  });

  const [enclosures, setEnclosures] = useState<Enclosure[]>(() => {
    const saved = localStorage.getItem('@canil:enclosures');
    return saved ? JSON.parse(saved) : INITIAL_ENCLOSURES;
  });

  // Salva alterações no LocalStorage automaticamente
  useEffect(() => {
    localStorage.setItem('@canil:dogs', JSON.stringify(dogs));
  }, [dogs]);

  useEffect(() => {
    localStorage.setItem('@canil:enclosures', JSON.stringify(enclosures));
  }, [enclosures]);

  // Função para adicionar um novo cão e atualizar a ocupação da baia
  const handleAddDog = (newDog: Dog) => {
    setDogs(prevDogs => [...prevDogs, newDog]);

    if (newDog.currentEnclosureId) {
      setEnclosures(prevEnclosures =>
        prevEnclosures.map(enc => {
          if (enc.id === newDog.currentEnclosureId) {
            return {
              ...enc,
              currentOccupants: [...enc.currentOccupants, newDog.id]
            };
          }
          return enc;
        })
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem 2rem' }}>
        <Dashboard dogs={dogs} enclosures={enclosures} />
        <DogForm enclosures={enclosures} onAddDog={handleAddDog} />
        <DogList dogs={dogs} enclosures={enclosures} />
        <EnclosureList dogs={dogs} enclosures={enclosures} />
      </div>
    </div>
  );
}

export default App;