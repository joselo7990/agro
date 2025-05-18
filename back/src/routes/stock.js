import express from "express"
import {
  getStock,
  getStockByTipo,
  addStock,
  updateStock,
  deleteStock,
} from "../controllers/stockControllers.js"

const router = express.Router()

// Obtener todo el stock
router.get("/", getStock)

// Obtener stock por tipo
router.get("/:tipo", getStockByTipo)

// Agregar nuevo item al stock
router.post("/", addStock)

// Actualizar un item del stock
router.put("/:id", updateStock)

// Eliminar un item del stock
router.delete("/:id", deleteStock)

export default router
