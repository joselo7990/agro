import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../../config"

function Stock() {
  const [stock, setStock] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tipo: "alambres",
    cantidad: "",
  })
  const [itemToEdit, setItemToEdit] = useState(null)

  useEffect(() => {
    obtenerStock()
  }, [])

  const obtenerStock = async () => {
    try {
      const response = await fetch(API_URL + "/stock", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      // Ordenar los datos por fecha de creación, del más nuevo al más viejo
      const datosOrdenados = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setStock(datosOrdenados)
    } catch (error) {
      console.error("Error al obtener el stock:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(API_URL + `/stock/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.status === 200) {
        obtenerStock()
      }
    } catch (error) {
      console.error("Error al eliminar el item:", error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (itemToEdit) {
      // Editar item existente
      const res = await fetch(API_URL + `/stock/${itemToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...itemToEdit,
          ...formData,
        }),
      })
      if (res.ok) {
        obtenerStock()
        setShowForm(false)
        setItemToEdit(null)
        setFormData({ tipo: "alambres", cantidad: "" })
      }
    } else {
      // Crear nuevo item
      const res = await fetch(API_URL + "/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        obtenerStock()
        setShowForm(false)
        setFormData({ tipo: "alambres", cantidad: "" })
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 mx-auto block mt-5 mb-5"
      >
        Agregar Stock
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {itemToEdit ? "Editar Stock" : "Agregar Stock"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tipo
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={itemToEdit}
                >
                  <option value="alambres">Alambres</option>
                  <option value="sanidad">Sanidad</option>
                  <option value="maderas">Maderas</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  value={formData.cantidad}
                  onChange={(e) =>
                    setFormData({ ...formData, cantidad: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setItemToEdit(null)
                    setFormData({ tipo: "alambres", cantidad: "" })
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  {itemToEdit ? "Guardar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla para pantallas grandes */}
      <table className="hidden sm:table max-w-8xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Tipo</th>
            <th className="py-2 px-4 text-left">Cantidad</th>
            <th className="py-2 px-4 text-left">Fecha de creación</th>
            <th className="py-2 px-4 text-left">Última actualización</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="py-1 px-3 text-gray-700">{item.tipo}</td>
              <td className="py-1 px-3 text-gray-700">{item.cantidad}</td>
              <td className="py-1 px-3 text-gray-700">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-1 px-3 text-gray-700">
                {new Date(item.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-1 px-3 text-gray-700">
                <button
                  className="text-red-600 mr-4"
                  onClick={() => handleDelete(item._id)}
                >
                  Eliminar
                </button>{" "}
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setItemToEdit(item)
                    setFormData({
                      tipo: item.tipo,
                      cantidad: item.cantidad,
                    })
                    setShowForm(true)
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista para móviles */}
      <div className="sm:hidden mt-5 space-y-4">
        {stock.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p className="text-gray-700 font-semibold">Tipo: {item.tipo}</p>
            <p className="text-gray-700">Cantidad: {item.cantidad}</p>
            <p className="text-gray-700">
              Creado: {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              Actualizado: {new Date(item.updatedAt).toLocaleDateString()}
            </p>
            <div className="flex justify-between mt-3">
              <button
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex-1 mr-2"
                onClick={() => handleDelete(item._id)}
              >
                Eliminar
              </button>
              <button
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex-1 ml-2"
                onClick={() => {
                  setItemToEdit(item)
                  setFormData({
                    tipo: item.tipo,
                    cantidad: item.cantidad,
                  })
                  setShowForm(true)
                }}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <Link to="/">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Volver al Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Stock
