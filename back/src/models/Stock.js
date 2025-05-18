import mongoose from "mongoose"

const stockSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ["alambres", "sanidad", "maderas"],
    },
    cantidad: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Stock", stockSchema)
