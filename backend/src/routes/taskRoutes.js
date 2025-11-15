import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController.js';
import validateTask from '../middlewares/inputValidator.js';

const router = express.Router();

router.get("/tasks", validateTask, getAllTasks);
router.post("/tasks", createTask);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", validateTask, updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;