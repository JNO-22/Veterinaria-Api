import Turno from "../models/turno.js";

export const getAllTurnos = async (req, res) => {
  const { day } = req.query;
  try {
    const turnos = await Turno.find()
      .select("-__v")
      .sort("fecha")
      .dayTurns(day)
      .populate({
        // Utilizar el método dayTurns para filtrar turnos por día
        path: "mascota", // Populate con la relación "mascota"
        select: "-__v -raza",
        populate: {
          path: "cliente", // Populate con la relación "cliente"
          select: "nombre",
        },
      });
    res.status(200).json({ data: turnos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const createTurno = async (req, res) => {
  console.log(req.body);

  try {
    const { fecha, hora, mascota } = req.body;
    const turno = new Turno({ fecha, hora, mascota });
    await turno.save();
    res.status(201).json({ data: turno });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Código de error de duplicado en MongoDB
      return res.status(409).send({ error: "Turno ya existente" });
    }
    res.status(500).send({ error: "Error al crear el turno" });
  }
};

export const deleteTurno = async (req, res) => {
  console.log(req.params.id);
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) {
      return res.status(404).send({ error: "Turno no encontrado" });
    }
    res.status(200).send({ message: "Turno eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al eliminar el turno" });
  }
};

export const updateTurno = async (req, res) => {
  const { id } = req.params;
  const { fecha, mascota, reporte, estado } = req.body;

  try {
    const turno = await Turno.findById(id);
    if (!turno) {
      return res.status(404).send({ error: "Turno no encontrado" });
    }

    turno.fecha = fecha;
    turno.mascota = mascota._id;
    turno.reporte = reporte;
    turno.estado = estado;

    await turno.save();

    res.status(200).json({ data: turno });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al actualizar el turno" });
  }
};
