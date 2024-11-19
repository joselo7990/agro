import { Router } from "express";

import {
  createDatosPotrero,
  getDatosAllPotreros,
  getDatosPotrerosbyName,
  updateDatosPotrero,
  getDatosPotreroById,
  deleteDatosPotrero,
} from "../controllers/datosControllers.js";

const datosRouter = Router();
datosRouter.get("/", getDatosAllPotreros);
datosRouter.get("/:potrero", getDatosPotrerosbyName);
datosRouter.post("/", createDatosPotrero);
datosRouter.post("/:id", updateDatosPotrero);
datosRouter.get("/:id", getDatosPotreroById);
datosRouter.delete("/:datosId", deleteDatosPotrero);

export default datosRouter;
