import express from "express";
import {
  createMascota,
  getAllMascotas,
  getClientMascotas,
  deleteMascota,
  updateMascota,
} from "../controllers/mascotController.js";

const router = express.Router();

// Rutas de mascotas
router.get("/", getAllMascotas);
router.post("/", createMascota);
router.put("/:id", updateMascota);
router.delete("/:id", deleteMascota);

// Rutas de mascotas por cliente
router.get("/cliente/:id", getClientMascotas);

export default router;
