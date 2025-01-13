import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import clientRouter from "./routes/clientRoutes.js";
import mascotaRouter from "./routes/mascotaRoutes.js";
import "./config/db.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Configuración
app.use(express.json());
app.use(
  cors({
    origin: [""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rutas
app.use(clientRouter);
app.use(mascotaRouter);

// Rutas

app.get("/", (req, res) => {
  res.send("¡Bienvenido a Fauna Veterinaria API!");
});

app.listen(port, () => {
  console.log("Servidor Funcionando en el puerto", port);
});
