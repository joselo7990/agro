import Actividad from "../models/Actividad.js";

const actividadesMensuales = [
  {
    mes: "Enero",
    nombre: "Manejo del rodeo de cría",
    descripcion:
      "Supervisar el estado corporal de vacas y ovejas, ajustando la alimentación según la disponibilidad de forraje en el campo natural.",
  },
  {
    mes: "Enero",
    nombre: "Recorridas avichados",
    descripcion: "Recorrer potreros cada 3 dias para controlar avichados.",
  },
  {
    mes: "Enero",
    nombre: "Monitoreo de parásitos",
    descripcion: "Realizar análisis coprológicos y dosificar si es necesario.",
  },
  {
    mes: "Febrero",
    nombre: "Monitoreo de parásitos",
    descripcion:
      "Realizar análisis coprológicos (HPG) y dosificar si es necesario.",
  },
  {
    mes: "Febrero",
    nombre: "Coordinación de baño patas",
    descripcion: "Planificar baño patas ",
  },
  {
    mes: "Febrero",
    nombre: "Baño ganado garrapatas",
    descripcion: "Planificar baño garrapatas ",
  },
  {
    mes: "Marzo",
    nombre: "Vacunacion Iver + parasitos",
    descripcion: "Supervisar el estado ganado.",
  },
  {
    mes: "Marzo",
    nombre: "Control de sanidad en recién nacidos",
    descripcion:
      "Aplicar tratamientos preventivos en terneros como la administración de vitaminas y minerales.",
  },
  {
    mes: "Marzo",
    nombre: "Mantenimiento de cercas y potreros",
    descripcion:
      "Revisar y reparar cercas y divisiones de potreros para garantizar la seguridad del ganado.",
  },
  {
    mes: "Marzo",
    nombre: "Vacunación contra aftosa",
    descripcion:
      "Aplicar la vacuna contra la fiebre aftosa en bovinos según el calendario sanitario.",
  },
  {
    mes: "Abril",
    nombre: "Destete de terneros",
    descripcion:
      "Separar los terneros de las madres y proporcionarles una alimentación adecuada para su desarrollo.",
  },

  {
    mes: "Abril",
    nombre: "Venta de terneros y vacunacion mancha Y gangrena",
    descripcion: "Clasificar ventas.",
  },

  {
    mes: "Mayo",
    nombre: "Venta de animales",
    descripcion:
      "Seleccionar y preparar animales para la venta, asegurando su buen estado de salud.",
  },

  {
    mes: "Mayo",
    nombre: "Control de malezas",
    descripcion:
      "Realizar controles de malezas en los potreros para mejorar la calidad del pasto disponible.",
  },
  {
    mes: "Junio",
    nombre: "Suplementación invernal",
    descripcion:
      "Proporcionar suplementos alimenticios al ganado debido a la menor disponibilidad de pasto en invierno.",
  },
  {
    mes: "Junio",
    nombre: "Revisión de instalaciones",
    descripcion:
      "Inspeccionar y mantener en buen estado las instalaciones como corrales y galpones.",
  },
  {
    mes: "Junio",
    nombre: "Control de enfermedades respiratorias",
    descripcion:
      "Vigilar y prevenir enfermedades respiratorias comunes en esta época del año.",
  },
  {
    mes: "Julio",
    nombre: "Planificación de la próxima temporada reproductiva",
    descripcion:
      "Evaluar los resultados reproductivos y planificar las actividades para la próxima temporada.",
  },
  {
    mes: "Julio",
    nombre: "Capacitación del personal",
    descripcion: "Brindar formación al personal en manejo y bienestar animal.",
  },
  {
    mes: "Julio",
    nombre: "Inventario de insumos",
    descripcion:
      "Realizar un inventario de insumos y planificar las compras necesarias.",
  },

  {
    mes: "Agosto",
    nombre: "Bano ganado",
    descripcion: "Ver de realizar un bano de ganado con fipronil",
  },

  {
    mes: "Septiembre",
    nombre: "Monitoreo de preñez",
    descripcion: "Realizar recorridas para garantizar paricion.",
  },
  {
    mes: "Septiembre",
    nombre: "Esquila de ovejas",
    descripcion:
      "Realizar la esquila de las ovejas para obtener lana y mejorar su bienestar.",
  },
  {
    mes: "Septiembre",
    nombre: "Vacunacion para parasitos",
    descripcion: "Ivermectina + Saguaype",
  },
  {
    mes: "Septiembre",
    nombre: "Repaso de toros",
    descripcion: "Evaluar estado de los toros",
  },
  {
    mes: "Octubre",
    nombre: "Bano garrapata",
    descripcion: "Bano flazuron.",
  },
  {
    mes: "Octubre",
    nombre: "Inicio de servicio en bovinos",
    descripcion:
      "Comenzar el empadre en vacas, asegurando la correcta fertilidad de los toros.",
  },
  {
    mes: "Octubre",
    nombre: "Vacunación reproductiva",
    descripcion: "Aplicar vacunas reproductivas en hembras bovinas y ovinas.",
  },

  {
    mes: "Noviembre",
    nombre: "Preparación de reservas forrajeras",
    descripcion: "Cosechar y almacenar forraje para el próximo invierno.",
  },
  {
    mes: "Diciembre",
    nombre: "Venta de excedentes",
    descripcion:
      "Comercializar animales que no serán retenidos en el establecimiento.",
  },
  {
    mes: "Diciembre",
    nombre: "Evaluación anual",
    descripcion:
      "Analizar los resultados productivos y económicos del año para planificar el siguiente.",
  },
];

const insertarActividadesPredefinidas = async () => {
  try {
    // Verificar si las actividades ya existen para evitar duplicados
    const count = await Actividad.countDocuments();
    if (count === 0) {
      await Actividad.insertMany(actividadesMensuales);
      console.log("Actividades predefinidas insertadas correctamente.");
    } else {
      console.log(
        "Las actividades predefinidas ya existen en la base de datos."
      );
    }
  } catch (error) {
    console.error("Error al insertar actividades predefinidas:", error);
  }
};

// Llamar a la función para insertar las actividades
insertarActividadesPredefinidas();

export const getActividades = async (req, res) => {
  try {
    const mes = req.params.mes;
    const actividades = await Actividad.find({ mes });
    res.status(200).json(actividades);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const createActividades = async (req, res) => {
  const { mes, nombre, descripcion } = req.body;
  console.log(req.body);
  try {
    //creo el potrero
    const newDatoActividad = new Actividad({
      mes,
      nombre,
      descripcion,
    });

    //guardo en la base de datos
    await newDatoActividad.save();
    // devuelvo si es correcto
    res.status(200).json(newDatoActividad);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteActividades = async (req, res) => {
  const actividadId = req.params.actividadId;

  try {
    const post = await Actividad.findOne({ _id: actividadId });
    console.log(post);
    if (post) {
      await Actividad.findByIdAndDelete({ _id: actividadId });
      res.status(200).json("ok");
    } else {
      res.status(500).json({ eror: "no pudiste eliminar" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
