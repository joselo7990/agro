import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";

function EditarDatos(params) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    vaca: "",
    novillo: "",
    terneros: "",
    toros: "",
    muertes: "",
    // nacimientos: "",
    sanidad: "",
    ventas: "",
    entradas: "",
    salidas: "",
    observaciones: "",
    potrero: "",
  });

  const navigate = useNavigate();
  const obtenerDatos = async () => {
    try {
      const response = await fetch(API_URL + `/datos/id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setFormData({
        vaca: data.vaca,
        novillo: data.novillo,
        terneros: data.terneros,
        toros: data.toros,
        muertes: data.muertes,
        // nacimientos: "",
        sanidad: data.sanidad,
        ventas: data.ventas,
        entradas: data.entradas,
        salidas: data.salidas,
        observaciones: data.observaciones,
        potrero: data.potrero,
      });
      console.log(data);
    } catch (error) {
      console.error("Error en el llamado a la API:", error);
    }
  };
  useEffect(() => {
    obtenerDatos();
  }, []);

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL + `/datos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/potreroDetail/${formData.potrero}`);
      })
      .catch((error) => console.error("Error al enviar los datos:", error));
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
            Editar Datos Potrero
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Vacas
            </label>
            <input
              type="text"
              name="vaca"
              value={formData.vaca}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad vacas"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Novillos
            </label>
            <input
              type="text"
              name="novillo"
              value={formData.novillo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad de novillos"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Terneros
            </label>
            <input
              type="text"
              name="terneros"
              value={formData.terneros}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad de terneros..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Toros
            </label>
            <input
              type="text"
              name="toros"
              value={formData.toros}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad de toros..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Muertes
            </label>
            <input
              type="text"
              name="muertes"
              value={formData.muertes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad de muertes..."
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nacimientos
            </label>
            <input
              type="text"
              name="nacimientos"
              onChange={handleChange}
              value={formData.nacimientos}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad de nacimientos..."
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Sanidad
            </label>
            <input
              type="text"
              name="sanidad"
              value={formData.sanidad}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa sanidad..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Ventas
            </label>
            <input
              type="text"
              name="ventas"
              onChange={handleChange}
              value={formData.ventas}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa si hay ventas..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Entradas
            </label>
            <input
              type="text"
              name="entradas"
              onChange={handleChange}
              value={formData.entradas}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa cantidad de entradas..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Salidas
            </label>
            <input
              type="text"
              name="salidas"
              value={formData.salidas}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa la cantidad de salidas..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Observaciones
            </label>
            <input
              type="text"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa observaciones..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Potrero
            </label>
            <input
              type="text"
              name="potrero"
              disabled
              value={formData.potrero}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa nombre del potrero..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Enviar
          </button>
          <Link to={"/"}>
            <button
              type=""
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 mt-5"
            >
              Volver al Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditarDatos;
