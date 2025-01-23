import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../config";

const DetalleMes = () => {
  const { nombreMes } = useParams();
  const [datos, setDatos] = useState(null);
  const [actividades, setActividad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const actividad = async (id) => {
    try {
      const response = await fetch(API_URL + `/actividades/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del potrero");
      }
      const data = await response.json();
      setDatos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    actividad(nombreMes);
  }, [nombreMes]);

  const handleDelete = async (id) => {
    const res = await fetch(API_URL + `/actividades/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) actividad(nombreMes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL + "/actividades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mes: nombreMes,
        nombre: actividades,
        descripcion: descripcion,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        actividad(nombreMes);
        setActividad("");
        setDescripcion("");
      })
      .catch((error) => console.error("Error al enviar los datos:", error));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Link to="/actividades">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5 mb-5">
          Volver a Actividades
        </button>
      </Link>
      <Link to="/">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5 mb-5">
          Volver a Home
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Actividades para {nombreMes}
      </h1>

      {/* Tabla de actividades */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg border-collapse">
          <thead className="bg-green-600 text-white text-sm uppercase">
            <tr>
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Actividad</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((actividad) => (
              <tr key={actividad._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">
                  {actividad.fecha &&
                    new Date(actividad.fecha).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">{actividad.nombre}</td>
                <td className="py-3 px-6">{actividad.descripcion}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDelete(actividad._id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-200"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario */}
      <div className="mt-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
            Registrar Actividad
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Actividad
            </label>
            <input
              type="text"
              value={actividades}
              onChange={(e) => setActividad(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa la actividad"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa descripción"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetalleMes;
