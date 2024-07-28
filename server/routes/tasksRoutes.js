import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, getTask, myTasks, updateTask } from "../controllers/taskControllers.js";

const router = Router();

router.get('/user/:id', authMiddleware, myTasks);
router.get('/:id', authMiddleware, getTask);
router.post('/create', authMiddleware, createTask);
router.patch('/:id', authMiddleware, updateTask);
router.delete('/:id',authMiddleware, deleteTask);

export default router;