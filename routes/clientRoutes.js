import express from "express";
import Cliente from "../models/cliente.js";
import Mascota from "../models/mascota.js";
const router = express.Router();

// CRUD de clientes
// Rutas de clientes
router.get("/cliente", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener los clientes" });
  }
});

// Ruta para obtener un cliente por su ID
router.get("/cliente/:id", async (req, res) => {
  const { id: clientId } = req.params;
  if (clientId.length !== 24) {
    return res.status(400).json({ error: "El ID es inválida" });
  }
  try {
    const client = await Cliente.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
});

// Ruta para crear un nuevo cliente
router.post("/cliente", async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;
    const cliente = new Cliente({ nombre, telefono, email });
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al crear el cliente" });
  }
});

// Ruta para actualizar un cliente
router.put("/cliente/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { nombre, telefono, email } = req.body;
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }
    cliente.nombre = nombre;
    cliente.telefono = telefono;
    cliente.email = email;
    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al actualizar el cliente" });
  }
});

// Ruta para eliminar un cliente
router.delete("/cliente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }
    res.status(200).send({ message: "Cliente eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al eliminar el cliente" });
  }
});

// Endpoint de negocio contar cantidad de mascotas por cliente
router.get("/mascotas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mascotas = await Mascota.find({ cliente: id });
    const count = mascotas.length;
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener las mascotas" });
  }
});

export default router;
