import Potreros from "../models/Potreros.js";

//get all
//create
//eliminar

export const getAllPotreros = async (req, res) => {
  try {
    const potreros = await Potreros.find();
    res.status(200).json(potreros);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createPotreros = async (req, res) => {
  const { dueño, nombre, dimensiones } = req.body;
  console.log(req.body);
  try {
    //creo el potrero
    const newPotrero = new Potreros({
      dueño,
      nombre,
      dimensiones,
    });

    //guardo en la base de datos
    await newPotrero.save();
    // devuelvo si es correcto
    res.status(200).json(newPotrero);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//eliminar  potrero

export const deleteById = async (req, res) => {
  const potreroId = req.params.potreroId;

  try {
    const post = await Potreros.findOne({ _id: potreroId });
    console.log(post);
    if (post) {
      await Potreros.findByIdAndDelete({ _id: potreroId });
      res.status(200).json("ok");
    } else {
      res.status(500).json({ eror: "no pudiste eliminar" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
