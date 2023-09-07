import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Buscador from '../src/assets/components/Buscador';
import MiApi from './assets/components/Miapi'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mt-5">
      <header>
        <h1>Usuarios con actividad inapropiada</h1>
      </header>

      <section>
        <Buscador onSearch={handleSearch} />
        <div>
          <h3>Resultados de búsqueda:</h3>
          <MiApi searchTerm={searchTerm} />
        </div>
      </section>
    </div>
  );
}

export default App;
