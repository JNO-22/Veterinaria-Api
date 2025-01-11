import express from "express";
import Mascota from "../models/mascota.js";
const router = express.Router();

// Rutas de mascotas por cliente
router.get("/mascota/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mascotas = await Mascota.find({ cliente: id });
    res.status(200).json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener las mascotas" });
  }
});

// Ruta para crear una mascota
router.post("/mascota", async (req, res) => {
  try {
    const { nombre, especie, raza, edad, cliente } = req.body;
    const mascota = new Mascota({ nombre, especie, raza, edad, cliente });
    await mascota.save();
    res.status(201).json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al crear la mascota" });
  }
});

export default router;
