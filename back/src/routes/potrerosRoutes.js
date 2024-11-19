import { Router } from "express";

import {
  getAllPotreros,
  createPotreros,
  deleteById,
} from "../controllers/potrerosControllers.js";

const potreroRouter = Router();

potreroRouter.get("/", getAllPotreros);
potreroRouter.post("/", createPotreros);
potreroRouter.delete("/:potreroId", deleteById);

export default potreroRouter;
