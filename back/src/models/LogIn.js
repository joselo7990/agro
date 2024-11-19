import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
