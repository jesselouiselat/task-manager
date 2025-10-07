import express from "express";
import {
  getTask,
  getTaskByUser,
  addTask,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

router.get("/getTask", checkAuth, getTask);
router.get("/getTaskByUser/:id", checkAuth, getTaskByUser);

router.post("/addTask", checkAuth, addTask);
router.put("/editTask/:id", checkAuth, editTask);
router.delete("/deleteTask/:id", checkAuth, deleteTask);

export default router;
