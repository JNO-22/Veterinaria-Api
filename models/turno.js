import mongoose from "mongoose";

const TurnoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
});

const Turno = mongoose.model("Turno", TurnoSchema);
export default Turno;
