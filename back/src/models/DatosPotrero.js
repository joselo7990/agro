import mongoose from "mongoose";
const DatosPotreroSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  vaca: {
    type: Number,
    required: false,
    default: 0,
  },
  novillo: {
    type: Number,
    required: false,
    default: 0,
  },
  terneros: {
    type: Number,
    required: false,
    default: 0,
  },
  toros: {
    type: Number,
    required: false,
    default: 0,
  },
  muertes: {
    type: Number,
    required: false,
    default: 0,
  },
  nacimientos: {
    type: Number,
    required: false,
    default: 0,
  },
  sanidad: {
    type: String,
    required: false,
  },
  ventas: {
    type: String,
    required: false,
    default: 0,
  },
  entradas: {
    type: String,
    required: false,
    default: 0,
  },
  salidas: {
    type: String,
    required: false,
    default: 0,
  },
  observaciones: {
    type: String,
    required: false,
  },
  potrero: {
    type: String,
    required: true,
    ref: "Potrero",
  },
});

const DatosPotrero = mongoose.model("DatosPotrero", DatosPotreroSchema);

export default DatosPotrero;
