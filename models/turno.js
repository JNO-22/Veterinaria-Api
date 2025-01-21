import mongoose from "mongoose";

const TurnoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
});

TurnoSchema.index({ fecha: 1, mascota: 1 }, { unique: true });

// Método para filtrar turnos por día
TurnoSchema.query.dayTurns = function (day) {
  if (!day) return this;
  const date = new Date(day); // Convertir la cadena de fecha a un objeto Date
  const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0)); // Establecer la hora a 00:00:00 UTC
  const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999)); // Establecer la hora a 23:59:59.999 UTC
  return this.where({
    fecha: { $gte: startOfDay, $lt: endOfDay },
  });
};

const Turno = mongoose.model("Turno", TurnoSchema);
export default Turno;
