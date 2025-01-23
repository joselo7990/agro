import { Router } from "express";

import {
  getActividades,
  createActividades,
  deleteActividades,
} from "../controllers/actividadesControllers.js";

const actividadesRouter = Router();
actividadesRouter.get("/:mes", getActividades);
actividadesRouter.post("/", createActividades);
actividadesRouter.delete("/:actividadId", deleteActividades);

export default actividadesRouter;
