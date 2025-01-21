import express from "express";
import {
  getAllTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
} from "../controllers/turnoController.js";

const router = express.Router();

// Rutas de turnos
router.get("/", getAllTurnos);
router.post("/", createTurno);
router.put("/:id", updateTurno);
router.delete("/:id", deleteTurno);

export default router;
