import React, { useState, useEffect } from 'react';

function parseDateFromString(dateString) {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function MiApi({ searchTerm }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() !== '') { 
      setLoading(true); 

      fetch('https://registro-1a4e7-default-rtdb.firebaseio.com/usuarios.json')
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const usuariosArray = Object.values(data);
            
            const filteredResults = usuariosArray.filter((usuario) => {
              return (
                usuario.fecha_ban.includes(searchTerm) ||
                usuario.id.includes(searchTerm) ||
                usuario.motivo_ban.includes(searchTerm)
              );
            });

            filteredResults.sort((a, b) => {
              const dateA = parseDateFromString(a.fecha_ban);
              const dateB = parseDateFromString(b.fecha_ban);
              return dateA - dateB;
            });

            setSearchResults(filteredResults);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar datos de la API:', error);
          setLoading(false);
        });
    } else {
      // Si searchTerm está vacío, establece los resultados en un array vacío
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <section>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>MOTIVO</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.fecha_ban}</td>
                  <td>{result.motivo_ban}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default MiApi;
