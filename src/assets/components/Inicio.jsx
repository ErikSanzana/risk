import React, { useState } from "react";
import Buscador from "./Buscador";
import MiApi from "./Miapi";

function Inicio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resetSearch, setResetSearch] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setResetSearch(false); // Restablece la bandera resetSearch cuando se realiza una nueva búsqueda
  };

  const handleInicioClick = () => {
    setResetSearch(true); // Activa la bandera resetSearch cuando se hace clic en "Inicio"
  };

  return (
    <section>
      <Buscador onSearch={handleSearch} />
      <div>
        <h3>Resultados de búsqueda:</h3>
        <MiApi searchTerm={searchTerm} resetSearch={resetSearch} />
      </div>
    </section>
  );
}

export default Inicio;
