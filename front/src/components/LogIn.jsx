import React, { useContext, useEffect, useState } from "react";
useNavigate;
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const { logIn, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Iniciar Sesión en AgroAPP
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
