import React from "react";
import { Link } from "react-router-dom";

const Table = ({ datos, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      {/* Usamos `hidden` para la tabla en dispositivos móviles */}
      <table className="hidden sm:table max-w-8xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Dueño</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Dimensiones</th>
            <th className="py-2 px-4 text-left">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato._id} className="border-b">
              <td className="py-1 px-3 text-gray-700">{dato.dueño}</td>
              <td className="py-1 px-3 text-gray-700">
                <Link
                  to={`/potreroDetail/${dato.nombre}`}
                  state={{ potrero: dato }}
                  className="text-blue-500 hover:underline"
                >
                  {dato.nombre}
                </Link>
              </td>
              <td className="py-1 px-3 text-gray-700">{dato.dimensiones} ha</td>
              <td>
                <button
                  onClick={() => handleDelete(dato._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
                  aria-label="Eliminar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6h18M9 6v12m6-12v12M5 6h14l-1 14H6L5 6zm3-3h8a1 1 0 011 1v1H7V4a1 1 0 011-1z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Versión móvil */}
      <div className="sm:hidden">
        {datos.map((dato) => (
          <div
            key={dato._id}
            className="bg-white shadow-md rounded-lg mb-4 p-4 border border-gray-200"
          >
            <p className="text-gray-700 font-semibold">Dueño: {dato.dueño}</p>
            <p className="text-gray-700">
              Nombre:{" "}
              <Link
                to={`/potreroDetail/${dato.nombre}`}
                className="text-blue-500 hover:underline"
              >
                {dato.nombre}
              </Link>
            </p>
            <p className="text-gray-700">Dimensiones: {dato.dimensiones} ha</p>
            <button
              onClick={() => handleDelete(dato._id)}
              className="mt-3 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-full flex items-center justify-center"
              aria-label="Eliminar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6h18M9 6v12m6-12v12M5 6h14l-1 14H6L5 6zm3-3h8a1 1 0 011 1v1H7V4a1 1 0 011-1z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
