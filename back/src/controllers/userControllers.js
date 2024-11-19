import User from "../models/LogIn.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const logIn = async (req, res) => {
  //obtengo los datos usuario
  console.log(req.body);
  const { email, password } = req.body;
  // busco el usuario en la base de datos
  const checkUser = await User.findOne({ email: email });
  if (!checkUser) {
    res.status(400).json({ mensaje: "Credenciales invalidas" });
  }
  // comparo las contrasenas
  if (!password) {
    res.status(400).json({ mensaje: "Credenciales invalidas" });
  }
  const match = bcrypt.compareSync(password, checkUser.password);
  console.log(match);
  if (!match) {
    return res.status(400).json({ mensaje: "Credenciales invalidas" });
  }
  //genero token
  const token = jwt.sign(
    {
      email,
    },
    "aapdoifeanpvcjadnocqeakd"
  );

  //respondo
  res.json({ mensaje: "Usuario logueado con exito", token, user: checkUser });
};
