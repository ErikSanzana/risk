import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaginaDos() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://registro-1a4e7-default-rtdb.firebaseio.com/usuarios.json")
      .then((response) => {
        const data = response.data;

        const bansByYear = {};

        for (const user_id in data) {
          const user_data = data[user_id];
          const fecha_ban = user_data.fecha_ban;
          const motivo_ban = user_data.motivo_ban;

          if (fecha_ban) {
            const year = fecha_ban.split("-")[2];
            const month = fecha_ban.split("-")[1];

            if (!bansByYear[year]) {
              bansByYear[year] = {};
            }

            if (!bansByYear[year][month]) {
              bansByYear[year][month] = {};
            }

            // Incrementa el recuento para el motivo de ban en este mes
            if (!bansByYear[year][month][motivo_ban]) {
              bansByYear[year][month][motivo_ban] = 0;
            }
            bansByYear[year][month][motivo_ban]++;
          }
        }

        // Convierte los datos en un formato de tabla
        const tableData = [];
        for (const year in bansByYear) {
          const yearData = bansByYear[year];
          for (const month in yearData) {
            const monthData = yearData[month];
            for (const motivo in monthData) {
              const motivoCount = monthData[motivo];
              tableData.push({
                Year: year,
                Month: month,
                Motivo: motivo,
                Count: motivoCount,
              });
            }
          }
        }

        // Ordena los datos por año y mes (más antiguo al más reciente)
        tableData.sort((a, b) => {
          if (a.Year === b.Year) {
            return a.Month.localeCompare(b.Month);
          }
          return a.Year - b.Year;
        });

        setTableData(tableData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="pagina-dos">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h2>Recuento de bans</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Año</th>
                <th>Mes</th>
                <th>Motivo de Ban</th>
                <th>Concurrencia</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.Year}</td>
                  <td>{row.Month}</td>
                  <td>{row.Motivo}</td>
                  <td>{row.Count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaginaDos;
