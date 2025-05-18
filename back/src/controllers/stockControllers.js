import Stock from "../models/Stock.js"

// Obtener todos los items de stock
const getStock = async (req, res) => {
  try {
    const stock = await Stock.find()
    res.status(200).json(stock)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Obtener stock por tipo (alambres, sanidad, maderas)
const getStockByTipo = async (req, res) => {
  try {
    const { tipo } = req.params
    const stock = await Stock.find({ tipo })
    res.status(200).json(stock)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Agregar nuevo item al stock
const addStock = async (req, res) => {
  try {
    const newStock = new Stock(req.body)
    const savedStock = await newStock.save()
    res.status(201).json(savedStock)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Actualizar un item del stock
const updateStock = async (req, res) => {
  try {
    const { id } = req.params
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedStock) {
      return res.status(404).json({ message: "Item no encontrado" })
    }
    res.status(200).json(updatedStock)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Eliminar un item del stock
const deleteStock = async (req, res) => {
  try {
    const { id } = req.params
    const deletedStock = await Stock.findByIdAndDelete(id)
    if (!deletedStock) {
      return res.status(404).json({ message: "Item no encontrado" })
    }
    res.status(200).json({ message: "Item eliminado correctamente" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { getStock, getStockByTipo, addStock, updateStock, deleteStock }
