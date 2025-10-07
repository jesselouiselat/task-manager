import express from "express";
import {
  getProject,
  getProjectByUser,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectController.js";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

router.get("/getProject", checkAuth, getProject);
router.get("/getProjectByUser/:id", checkAuth, getProjectByUser);

router.post("/addProject", checkAuth, addProject);
router.put("/editProject/:id", checkAuth, editProject);
router.delete("/deleteProject/:id", checkAuth, deleteProject);

export default router;
