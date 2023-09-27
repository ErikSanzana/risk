import React, { useState, useEffect } from 'react';

function Buscador({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Realizar una búsqueda en blanco cuando se monta el componente
  useEffect(() => {
    onSearch('');
  }, []);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por fecha, ID o motivo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buscador;
