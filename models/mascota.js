import mongoose from "mongoose";

const MascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especie: { type: String, required: true },
  raza: { type: String, required: false },
  edad: { type: Number, required: false },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
});

MascotaSchema.query.byEspecie = function (especie) {
  if (!especie) return this;
  return this.where({ especie: new RegExp(`^${especie}$`, "i") });
};

const Mascota = mongoose.model("Mascota", MascotaSchema);

export default Mascota;
