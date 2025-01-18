import express from "express";
import {
  getClient,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
const router = express.Router();

//Rutas Basicas
router.get("/", getAllClients);
router.get("/:id", getClient);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
