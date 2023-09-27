import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaDos from '../src/assets/components/PaginaDos';
import Inicio from "./assets/components/Inicio"
import Navegacion from "./assets/components/Navegacion";
import UserRevision from './assets/components/UserRevision';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="container mt-5">
        <header>
          <h1>Usuarios con actividad inapropiada</h1>
        </header>

        <Navegacion />

        <Routes>
          <Route
            path="/"
            element={<Inicio searchTerm={searchTerm} handleSearch={handleSearch} />}
          />
          <Route path="/pagina-dos" element={<PaginaDos/>} />
          <Route path="/UserRevision" element={<UserRevision/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
