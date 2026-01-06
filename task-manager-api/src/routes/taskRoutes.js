import express from "express";
import {
  getTaskByProject,
  getTaskByUser,
  addTask,
  editTask,
  toggleTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

router.get("/getTaskByProject/:projectId", checkAuth, getTaskByProject);
router.get("/getTaskByUser/", checkAuth, getTaskByUser);

router.post("/addTask", checkAuth, addTask);

router.put("/editTask/:taskId", checkAuth, editTask);
router.patch("/editTaskStatus/:taskId", checkAuth, toggleTaskStatus);

router.delete("/deleteTask/:taskId", checkAuth, deleteTask);

export default router;
