import Project from "../models/Project.js";

export async function findProjectOrFail(id, res) {
  const project = await Project.findOne({ where: { id } });

  if (project === false) {
    res.status(404).json({ message: "No project found" });
    return null;
  }
  return project;
}

export async function checkOwnership(project, userId, res) {
  if (project.userId !== userId) {
    res
      .status(401)
      .json({ message: "You are unauthorized to perform this action." });
    return false;
  }
  return true;
}
