import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap

function Navegacion() {
  const location = useLocation();

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className={`btn btn-primary ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
      </li>
      <li className="nav-item">
        <Link to="/pagina-dos" className={`btn btn-primary ${location.pathname === '/pagina-dos' ? 'active' : ''}`}>Recuento de Baneos</Link>
      </li>
      <li className="nav-item">
        <Link to="/UserRevision" className={`btn btn-primary ${location.pathname === '/UserRevision' ? 'active' : ''}`}>Usuarios en Revisión</Link>
      </li>
    </ul>
  );
}

export default Navegacion;
