import mongoose from "mongoose";

const PotreroSchema = new mongoose.Schema(
  {
    dueño: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    dimensiones: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Potrero = mongoose.model("Potrero", PotreroSchema);

export default Potrero;
