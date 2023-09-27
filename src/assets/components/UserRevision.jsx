import React, { useState, useEffect } from 'react';

const UserRevision = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de la API y actualizar el estado local
    fetch('https://usuarios-pendientes-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json')
      .then((response) => response.json())
      .then((data) => {
        const usersList = [];
        for (const usuarioId in data) {
          const usuario = data[usuarioId];
          usuario.id = usuarioId;
          usersList.push(usuario);
        }
        setUsers(usersList);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error);
      });
  }, []);

  // Separar las líneas en "FINALIZADO" y "NO FINALIZADO"
  const finalizadoRows = [];
  const noFinalizadoRows = [];

  users.forEach((user) => {
    Object.keys(user.revisiones).forEach((revisionId) => {
      const row = (
        <tr key={`${user.id}-${revisionId}`} className={user.revisiones[revisionId].estado === 'FINALIZADO' ? 'finalizado' : ''}>
          <td>{user.id}</td>
          <td>{user.nombre}</td>
          <td>{revisionId}</td>
          <td>{user.revisiones[revisionId].fecha}</td>
          <td>{user.revisiones[revisionId].motivo}</td>
          <td>{user.revisiones[revisionId].estado}</td>
        </tr>
      );

      if (user.revisiones[revisionId].estado === 'FINALIZADO') {
        finalizadoRows.push(row);
      } else {
        noFinalizadoRows.push(row);
      }
    });
  });

  // Concatenar las listas de filas, poniendo las finalizadas al final
  const allRows = noFinalizadoRows.concat(finalizadoRows);

 
  // Ordenar las filas por la columna "Fecha" de la más antigua a la más actual
  const sortedRows = allRows.sort((a, b) => {
    const estadoA = a.props.children[5].props.children;
    const estadoB = b.props.children[5].props.children;
  
    if (estadoA === 'FINALIZADO' && estadoB !== 'FINALIZADO') {
      return 1; // A va después de B
    }
    if (estadoA !== 'FINALIZADO' && estadoB === 'FINALIZADO') {
      return -1; // A va antes que B
    }
  
    // Si ambos estados son iguales, entonces ordenamos por fecha
    const datePartsA = a.props.children[3].props.children.split("-");
    const datePartsB = b.props.children[3].props.children.split("-");
    const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
    const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
    
    return dateA.getTime() - dateB.getTime(); // Comparamos las fechas como números (timestamps)
  });


  // Renderizar las filas ordenadas en la tabla
  return (
    <div className="container mt-4">
      <h1>Usuarios en Revisión</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Número de Revisión</th>
            <th>Fecha</th>
            <th>Motivo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows}
        </tbody>
      </table>
    </div>
  );
  };

export default UserRevision;
