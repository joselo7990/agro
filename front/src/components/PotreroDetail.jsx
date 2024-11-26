import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";

function PotreroDetail() {
  const { id } = useParams();

  const [potrero, setPotrero] = useState(null);

  const detailPotrero = async (id) => {
    try {
      const response = await fetch(API_URL + `/datos/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del potrero");
      }
      const data = await response.json();
      setPotrero(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    detailPotrero(id);
  }, [id]);

  const deleteDatosPotrero = async (Datosid) => {
    const res = await fetch(API_URL + `/datos/${Datosid}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      detailPotrero(id);
    }
  };
  const updateDatosPotrero = async (DatosId) => {
    const res = await fetch();
  };
  const sumaTotal = (p) => {
    let total = 0;
    total += p.vaca || 0;
    total += p.novillo || 0;
    total += p.terneros || 0;
    total -= p.muertes || 0;
    total += p.entradas || 0;
    total -= p.salidas || 0;
    total -= p.ventas || 0;
    return total;
  };

  if (!potrero) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Link to={"/formulario"} state={{ potrero: id }}>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5"
        >
          Agregar Datos
        </button>
      </Link>
      {/* Tabla para pantallas grandes */}
      <table className="hidden sm:table max-w-8xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left ">Fecha</th>
            <th className="py-2 px-4 text-left ">
              <Link to="/infoPotreros">Potrero</Link>
            </th>
            <th className="py-2 px-4 text-left ">Vacas</th>
            <th className="py-2 px-4 text-left ">Novillos</th>
            <th className="py-2 px-4 text-left ">Terneros</th>
            <th className="py-2 px-4 text-left ">Muertes</th>
            <th className="py-2 px-4 text-left ">Sanidad</th>
            <th className="py-2 px-4 text-left ">Entradas</th>
            <th className="py-2 px-4 text-left ">Salidas</th>
            <th className="py-2 px-4 text-left ">Ventas</th>
            <th className="py-2 px-4 text-left ">Observaciones</th>
            <th className="py-2 px-4 text-left ">Total</th>
            <th className="py-2 px-4 text-left ">Eliminar</th>
            <th className="py-2 px-4 text-left ">Editar</th>
          </tr>
        </thead>

        <tbody>
          {potrero.map((p, index) => (
            <tr key={index} className="border-b">
              <td className="py-1 px-3 text-gray-700 ">
                {new Date(p.fecha).toLocaleDateString()}
              </td>
              <td className="py-1 px-3 text-gray-700 ">{p.potrero}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.vaca}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.novillo}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.terneros}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.muertes}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.sanidad}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.entradas}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.salidas}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.ventas}</td>
              <td className="py-1 px-3 text-gray-700 ">{p.observaciones}</td>
              <td className="py-1 px-3 text-gray-700 ">{sumaTotal(p)}</td>
              <td className="py-1 px-3 text-gray-700 ">
                <button
                  className="text-red-600"
                  onClick={() => deleteDatosPotrero(p._id)}
                >
                  Eliminar
                </button>
              </td>
              <Link to={`/formularioEdit/${p._id}`}>
                <td className="py-1 px-3 text-gray-700 ">
                  <button className="text-blue-600">Editar</button>
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Versión móvil */}
      <div className="sm:hidden mt-5 space-y-4">
        {potrero.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p className="text-gray-700 font-semibold">
              Fecha: {new Date(p.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-700">Potrero: {p.potrero}</p>
            <p className="text-gray-700">Vacas: {p.vaca}</p>
            <p className="text-gray-700">Novillos: {p.novillo}</p>
            <p className="text-gray-700">Terneros: {p.terneros}</p>
            <p className="text-gray-700">Muertes: {p.muertes}</p>
            <p className="text-gray-700">Sanidad: {p.sanidad}</p>
            <p className="text-gray-700">Entradas: {p.entradas}</p>
            <p className="text-gray-700">Salidas: {p.salidas}</p>
            <p className="text-gray-700">Ventas: {p.ventas}</p>
            <p className="text-gray-700">Observaciones: {p.observaciones}</p>
            <p className="text-gray-700 font-bold">Total: {sumaTotal(p)}</p>
            <button
              className="mt-3 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-full flex items-center justify-center"
              onClick={() => deleteDatosPotrero(p._id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <Link to={"/"}>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Volver al Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PotreroDetail;
