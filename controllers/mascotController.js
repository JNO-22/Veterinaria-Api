import Mascota from "../models/mascota.js";
import Cliente from "../models/cliente.js";
import Turno from "../models/turno.js";

export const getMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id)
      .select("-__v")
      .populate({ path: "cliente", select: "_id nombre " });
    if (!mascota) {
      return res.status(404).send({ error: "Mascota no encontrada" });
    }
    res.status(200).json({ data: mascota });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener la mascota" });
  }
};
export const getAllMascotas = async (req, res) => {
  const { especie } = req.query;
  try {
    const mascotas = await Mascota.find()
      .byEspecie(especie) // Utilizar el método byEspecie
      .sort("cliente") // Ordenar por el campo "cliente"
      .populate({
        // Populate con la relación "cliente"
        path: "cliente",
        select: "_id nombre mascotas",
      });

    if (!mascotas) {
      console.log("Mascotas no encontradas");
      return res.status(404).send({ error: "Mascotas no encontradas" });
    }

    res.status(200).json({ data: mascotas });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener las mascotas" });
  }
};

export const createMascota = async (req, res) => {
  const { nombre, especie, raza, edad, cliente: clienteId } = req.body;

  try {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }

    const mascota = new Mascota({
      nombre,
      especie,
      raza,
      edad,
      cliente: clienteId,
    });
    await mascota.save();

    res.status(201).json({ data: mascota });
  } catch (error) {
    res.status(500).send({ error: "Error al crear la mascota" });
  }
};

export const deleteMascota = async (req, res) => {
  const { id: mascotaId } = req.params;
  try {
    const mascota = await Mascota.findByIdAndDelete(mascotaId);
    if (!mascota) {
      return res.status(404).send({ error: "Mascota no encontrada" });
    }

    await Turno.deleteMany({ mascota: mascotaId });

    res.status(200).send({ message: "Mascota eliminada" });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar la mascota" });
  }
};

export const updateMascota = async (req, res) => {
  const { id: mascotaId } = req.params;
  const { nombre, especie, raza, edad } = req.body;
  try {
    const mascota = await Mascota.findById(mascotaId);
    if (!mascota) {
      return res.status(404).send({ error: "Mascota no encontrada" });
    }
    mascota.nombre = nombre;
    mascota.especie = especie;
    mascota.raza = raza;
    mascota.edad = edad;
    await mascota.save();
    res.status(200).json({ data: mascota });
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar la mascota" });
  }
};

// Endpoint para obtener las mascotas de un cliente
export const getClientMascotas = async (req, res) => {
  const { id: clienteId } = req.params;

  try {
    const cliente = await Cliente.findById(clienteId);

    if (!cliente) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }

    const mascotas = await Mascota.find({ cliente: clienteId });
    res.status(200).json({ data: mascotas });
  } catch (error) {
    res.status(500).send({ error: "Error al obtener las mascotas" });
  }
};
