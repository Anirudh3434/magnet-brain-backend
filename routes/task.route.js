import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskPriority
} from "../controllers/task.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes (only logged-in users can access)
router.post("/", protect, createTask);             // Create task
router.get("/", protect, getTasks);                // Get all tasks with pagination
router.get("/:id", protect, getTaskById);          // Get task details
router.put("/:id", protect, updateTask);           // Update task
router.delete("/:id", protect, deleteTask);        // Delete task
router.patch("/:id/status", protect, updateTaskStatus);   // Update task status
router.patch("/:id/priority", protect, updateTaskPriority); // Update priority

export default router;