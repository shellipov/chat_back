import express from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
