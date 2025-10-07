import Project from "../models/Project.js";
import { findProjectOrFail, checkOwnership } from "../utils/projectUtils.js";

export const getProject = async (req, res) => {
  try {
    const allProjects = await Project.findAll();
    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProjectByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const allProjects = await Project.findAll({ where: { userId } });
    console.log(allProjects);

    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    const addProject = await Project.create({ title: title, userId: userId });
    await addProject.save();
    res.status(201).json({
      message: `${title} is added succesfully`,
      title: addProject.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editProject = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const project = await findProjectOrFail(id, res);
    console.log(project);

    if (!project) return;

    if (!checkOwnership(project, userId, res)) return;

    const editProject = await Project.update({ title }, { where: { id } });

    res.status(201).json({
      message: `${title} is updated succesfully`,
      title: editProject.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await findProjectOrFail(id, res);
    if (!project) return;

    if (!checkOwnership(project, userId, res)) return;

    await project.destroy();

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
