import { useState } from "react"

import "./App.css"
import Home from "./components/Home"
import Navbar from "./components/NavBar"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import PonerDatos from "./components/PonerDatos"
import PotreroDetail from "./components/PotreroDetail"
import AgregarPotrero from "./components/AgregarPotrero"
import LogIn from "./components/LogIn"
import UserContextProvider from "./context/userContext"
import PrivateRoute from "./components/PrivateRoute"
import EditarDatos from "./components/EditarDatos"
import Actividades from "./components/Actividades"
import DetalleMes from "./components/DetalleMes"
import Stock from "./components/Stock"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar></Navbar>

          <Routes>
            <Route path="/login" element={<LogIn />}></Route>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/formulario"
              element={
                <PrivateRoute>
                  <PonerDatos />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/formularioEdit/:id"
              element={
                <PrivateRoute>
                  <EditarDatos />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/potreroDetail/:id"
              element={
                <PrivateRoute>
                  <PotreroDetail />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/agregarPotrero"
              element={
                <PrivateRoute>
                  <AgregarPotrero />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/actividades"
              element={
                <PrivateRoute>
                  <Actividades />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/stock"
              element={
                <PrivateRoute>
                  <Stock />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/mes/:nombreMes"
              element={
                <PrivateRoute>
                  <DetalleMes />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
