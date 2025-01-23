import { useEffect, useState } from "react";
import Table from "./Table";
import DataForm from "./PonerDatos";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
function Home(params) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);
  const obtenerDatos = async () => {
    try {
      const response = await fetch(API_URL + "/potrero", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // Ordenar los datos por "dueño"
      const datosOrdenados = data.sort((a, b) => {
        if (a.dueño < b.dueño) return -1;
        if (a.dueño > b.dueño) return 1;
        return 0;
      });

      // Actualizar el estado con los datos ordenados
      setDatos(datosOrdenados);

      // setDatos(data);
    } catch (error) {
      console.error("Error en el llamado a la API:", error);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(API_URL + `/potrero/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.status === 200) {
      obtenerDatos();
    }
  };

  return (
    <div>
      <div className="relative inline-block text-left"></div>
      <Link to="/actividades">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5 mb-5">
          Actividades
        </button>
      </Link>

      <Table datos={datos} handleDelete={handleDelete}></Table>

      <Link to="/agregarPotrero">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5">
          Agregar Potrero
        </button>
      </Link>
    </div>
  );
}

export default Home;
