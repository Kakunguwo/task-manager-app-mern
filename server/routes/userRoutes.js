import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/:id', authMiddleware, getUser);
router.delete('/:id', authMiddleware, deleteUser);
router.patch('/edit-user', authMiddleware, updateUser);


export default router;
