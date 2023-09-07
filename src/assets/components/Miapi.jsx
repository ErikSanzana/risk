import React, { useState, useEffect } from 'react';

function parseDateFromString(dateString) {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function MiApi({ searchTerm }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realizar la solicitud GET a la API y aplicar filtrado
    fetch('https://registro-1a4e7-default-rtdb.firebaseio.com/usuarios.json')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Convertir el objeto en un array de usuarios
          const usuariosArray = Object.values(data);
          // Filtrar los resultados basados en el término de búsqueda
          const filteredResults = usuariosArray.filter((usuario) => {
            return (
              usuario.fecha_ban.includes(searchTerm) ||
              usuario.id.includes(searchTerm) ||
              usuario.motivo_ban.includes(searchTerm)
            );
          });

          // Ordenar los resultados por fecha
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
