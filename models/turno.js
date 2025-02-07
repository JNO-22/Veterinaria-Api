import mongoose from "mongoose";

const TurnoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
  estado: {
    type: String,
    required: false,
    enum: ["pendiente", "cancelado", "atendido"],
    default: "pendiente",
  },
  reporte: { type: String, required: false },
});

// Método para filtrar turnos por día
TurnoSchema.query.dayTurns = function (day) {
  if (!day) return this;
  const date = new Date(day); // Convertir la cadena de fecha a un objeto Date

  if (isNaN(date.getTime())) {
    throw new Error("La fecha proporcionada no es válida.");
  }
  const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0)); // Establecer la hora a 00:00:00 UTC
  const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999)); // Establecer la hora a 23:59:59.999 UTC
  return this.where({
    fecha: { $gte: startOfDay, $lt: endOfDay },
  });
};

const Turno = mongoose.model("Turno", TurnoSchema);
export default Turno;
