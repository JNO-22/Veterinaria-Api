import Cliente from "../models/cliente.js";
import Mascota from "../models/mascota.js";

export const getClient = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id)
      .select("-__v")
      .populate({
        path: "mascotas",
        select: "-__v -_id -cliente",
      });
    if (!cliente) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }
    res.status(200).json({ data: cliente });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener el cliente" });
  }
};

export const getAllClients = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const clients = await Cliente.find()
      .limit(limit)
      .skip(offset)
      .select("-__v");
    const total = await Cliente.countDocuments();
    res.status(200).json({ data: clients, total });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener los clientes" });
  }
};

export const createClient = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;
    const client = new Cliente({ nombre, telefono, email });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al crear el cliente" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;
    const client = await Cliente.findById(req.params.id);
    if (!client) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }
    client.nombre = nombre;
    client.telefono = telefono;
    client.email = email;
    await client.save();
    res.status(200).json({ data: client });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al actualizar el cliente" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Cliente.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }

    await Mascota.deleteMany({ cliente: client._id }); // Eliminar todas las mascotas asociadas al cliente
    res
      .status(200)
      .send({ message: "Cliente y mascotas eliminados de la base de datos" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al eliminar el cliente" });
  }
};
