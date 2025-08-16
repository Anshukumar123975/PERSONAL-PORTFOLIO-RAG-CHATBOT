import { mainController } from "./main.controller.js";
import express from "express"

const router = express.Router();

router.post("/main", mainController);

export default router;