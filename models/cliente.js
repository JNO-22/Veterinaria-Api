import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);

export default Cliente;
