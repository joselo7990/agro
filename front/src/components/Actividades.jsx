import React from "react";
import { Link } from "react-router-dom";

const Actividades = () => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="p-4">
      <Link to="/">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5 mb-5">
          Volver a Home
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Actividades Anuales
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meses.map((mes, index) => (
          <Link to={`/mes/${mes}`} key={index}>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              <h2 className="text-xl font-semibold text-center">{mes}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Actividades;
