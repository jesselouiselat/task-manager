import Task from "../models/Task.js";

export async function findTaskOrFail(id, res) {
  const task = await Task.findOne({ where: { id } });

  if (task === false) {
    res.status(404).json({ message: "No Task found" });
    return null;
  }
  return task;
}

export async function checkOwnership(task, userId, res) {
  if (task.userId !== userId) {
    res
      .status(401)
      .json({ message: "You are unauthorized to perform this action." });
    return false;
  }
  return true;
}
