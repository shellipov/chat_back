import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController.js";

router.get("/", usersController.getUsers);
router.post("/user", usersController.getUsername);

export default router;
