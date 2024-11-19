import DatosPotrero from "../models/DatosPotrero.js";

export const getDatosAllPotreros = async (req, res) => {
  try {
    const potreros = await DatosPotrero.find();
    res.status(200).json(potreros);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getDatosPotrerosbyName = async (req, res) => {
  //query params//

  const potrero = req.params.potrero;
  console.log(potrero);

  try {
    const potreros = await DatosPotrero.find({ potrero });

    res.status(200).json(potreros);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const createDatosPotrero = async (req, res) => {
  console.log("probando");
  const {
    fecha,
    vaca,
    novillo,
    terneros,
    toros,
    muertes,
    nacimientos,
    sanidad,
    observaciones,
    potrero,
    entradas,
    salidas,
  } = req.body;
  console.log(req.body);
  try {
    //creo el potrero
    const newDatoPotrero = new DatosPotrero({
      fecha,
      vaca,
      novillo,
      terneros,
      toros,
      muertes,
      nacimientos,
      sanidad,
      observaciones,
      potrero,
      entradas,
      salidas,
    });

    //guardo en la base de datos
    await newDatoPotrero.save();
    // devuelvo si es correcto
    res.status(200).json(newDatoPotrero);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//editar

export const updateDatosPotrero = async (req, res) => {
  const { id } = req.params; // Tomamos el id del parámetro de la URL
  const {
    fecha,
    vaca,
    novillo,
    terneros,
    toros,
    muertes,
    nacimientos,
    sanidad,
    observaciones,
    potrero,
    entradas,
    salidas,
  } = req.body;

  try {
    // Actualizamos los datos en la base de datos
    const updatedDatoPotrero = await DatosPotrero.findByIdAndUpdate(
      id,
      {
        fecha,
        vaca,
        novillo,
        terneros,
        toros,
        muertes,
        nacimientos,
        sanidad,
        observaciones,
        potrero,
        entradas,
        salidas,
      },
      { new: true } // Esto devuelve el documento actualizado
    );

    // Si el dato no existe, enviamos un error 404
    if (!updatedDatoPotrero) {
      return res.status(404).json({ message: "Dato no encontrado" });
    }

    // Enviamos la respuesta con el dato actualizado
    res.status(200).json(updatedDatoPotrero);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//getbyId

export const getDatosPotreroById = async (req, res) => {
  const { id } = req.params; // Capturamos el id del parámetro de la URL

  try {
    // Buscamos el dato en la base de datos
    const datoPotrero = await DatosPotrero.findById(id);

    // Si el dato no existe, enviamos un error 404
    if (!datoPotrero) {
      return res.status(404).json({ message: "Dato no encontrado" });
    }

    // Enviamos el dato encontrado
    res.status(200).json(datoPotrero);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//delete

export const deleteDatosPotrero = async (req, res) => {
  const datosId = req.params.datosId;

  try {
    const post = await DatosPotrero.findOne({ _id: datosId });
    console.log(post);
    if (post) {
      await DatosPotrero.findByIdAndDelete({ _id: datosId });
      res.status(200).json("ok");
    } else {
      res.status(500).json({ eror: "no pudiste eliminar" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
