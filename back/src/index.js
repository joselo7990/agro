import express from "express";
import connectDB from "./db.config.js";
import potreroRouter from "./routes/potrerosRoutes.js";
import datosRouter from "./routes/datosPotrero.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://agro-ashy.vercel.app", // "http://localhost:5173" // desde donde permito que le peguen a mi back
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/potrero", potreroRouter);
app.use("/datos", datosRouter);
app.use("/user", userRouter);
connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log("Servidor corriendo en el puerto 8080");
    });
  })
  .catch((error) => {});
