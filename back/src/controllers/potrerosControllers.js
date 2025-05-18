import Potreros from "../models/Potreros.js"
import DatosPotrero from "../models/DatosPotrero.js"

const sumaTotal = (p) => {
  let total = 0
  total += Number(p.vaca) || 0
  total += Number(p.novillo) || 0
  total += Number(p.terneros) || 0
  total += Number(p.toros) || 0
  total -= Number(p.muertes) || 0
  total += Number(p.entradas) || 0
  total -= Number(p.salidas) || 0
  total -= Number(p.ventas) || 0
  return total
}

export const getAllPotreros = async (req, res) => {
  try {
    const potreros = await Potreros.find()

    // Obtener los datos adicionales para cada potrero
    const potrerosConDatos = await Promise.all(
      potreros.map(async (potrero) => {
        // Buscar el último dato agregado para este potrero
        const ultimoDato = await DatosPotrero.findOne({
          potrero: potrero.nombre,
        })
          .sort({ fecha: -1 })
          .select(
            "fecha vaca novillo terneros toros muertes entradas salidas ventas"
          )

        // Retornar el potrero con la información adicional
        return {
          ...potrero.toObject(),
          ultimaFecha: ultimoDato ? ultimoDato.fecha : null,
          totalAnimales: ultimoDato ? sumaTotal(ultimoDato) : 0,
        }
      })
    )

    res.status(200).json(potrerosConDatos)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createPotreros = async (req, res) => {
  const { dueño, nombre, dimensiones } = req.body
  console.log(req.body)
  try {
    //creo el potrero
    const newPotrero = new Potreros({
      dueño,
      nombre,
      dimensiones,
    })

    //guardo en la base de datos
    await newPotrero.save()
    // devuelvo si es correcto
    res.status(200).json(newPotrero)
  } catch (error) {
    res.status(500).json({ error })
  }
}

//eliminar  potrero

export const deleteById = async (req, res) => {
  const potreroId = req.params.potreroId

  try {
    const post = await Potreros.findOne({ _id: potreroId })
    console.log(post)
    if (post) {
      await Potreros.findByIdAndDelete({ _id: potreroId })
      res.status(200).json("ok")
    } else {
      res.status(500).json({ eror: "no pudiste eliminar" })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
