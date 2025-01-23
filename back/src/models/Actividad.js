import mongoose from "mongoose";

const ActividadSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  mes: {
    type: String,
    required: true,
    enum: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
});

const Actividad = mongoose.model("Actividad", ActividadSchema);

export default Actividad;
