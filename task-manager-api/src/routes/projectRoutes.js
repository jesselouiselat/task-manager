import express from "express";
import {
  getProjectByUser,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectController.js";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

// only for testing, no checkauth

router.get("/getProjectByUser/", checkAuth, getProjectByUser);

router.post("/addProject", checkAuth, addProject);
router.put("/editProject/:id", checkAuth, editProject);
router.delete("/deleteProject/:id", checkAuth, deleteProject);

export default router;
