import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import clientRouter from "./routes/clientRoutes.js";
import mascotaRouter from "./routes/mascotRoutes.js";
import turnoRouter from "./routes/turnoRoutes.js";
import "./config/db.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Configuración
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rutas
app.use("/cliente", clientRouter);
app.use("/mascota", mascotaRouter);
app.use("/turno", turnoRouter);

// Ruta raiz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a Fauna Veterinaria API!");
});

app.listen(port, () => {
  console.log("Servidor Funcionando en el puerto", port);
});
