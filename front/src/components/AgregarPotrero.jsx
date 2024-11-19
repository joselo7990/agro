import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function AgregarPotrero(params) {
  const navigate = useNavigate();
  const [dueño, setDueño] = useState("");
  const [nombre, setNombre] = useState("");
  const [dimensiones, setDimensiones] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL + "/potrero", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dueño: dueño,
        nombre: nombre,
        dimensiones: dimensiones,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar los datos");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/");

        //  limpiao el formulario
        setDueño("");
        setNombre("");
        setDimensiones("");
      })

      .catch((error) => console.error("Error al enviar los datos:", error));
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Agregar Potrero
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Dueño
          </label>
          <input
            type="text"
            name="dueño"
            value={dueño}
            onChange={(e) => setDueño(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ingresa el dueño..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ingresa el nombre del potrero..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Dimesiones
          </label>
          <input
            type="text"
            name="dimensiones"
            value={dimensiones}
            onChange={(e) => setDimensiones(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ingresa las dimensiones"
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
  );
}

export default AgregarPotrero;
