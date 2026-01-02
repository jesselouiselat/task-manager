import Task from "../models/Task.js";
import { findTaskOrFail, checkOwnership } from "../utils/taskUtils.js";

export const getTaskByProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;
    const allTasks = await Task.findAll({
      where: { projectId, userId },
      order: [["createdAt", "ASC"]],
    });

    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { content, projectId } = req.body;
    const userId = req.user.id;

    const addTask = await Task.create({
      content: content,
      userId: userId,
      projectId: projectId,
    });
    await addTask.save();

    res.status(201).json({
      message: `${content} is added succesfully`,
      task: addTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { content } = req.body;
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await findTaskOrFail(taskId, res);

    if (!task) return;

    if (!checkOwnership(task, userId, res)) return;

    const [updated] = await Task.update({ content }, { where: { id: taskId } });
    if (!updated) return res.status(404).json({ message: "Task not found" });

    const updatedTask = await Task.findByPk(taskId);

    res.status(201).json({
      message: `${updatedTask.content} is updated successfully`,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await findTaskOrFail(taskId, res);
    if (!task) return;

    if (!checkOwnership(task, userId, res)) return;

    const updatedTask = await Task.update(
      { isDone: !task.isDone },
      { where: { id: taskId }, returning: true }
    );
    res.status(201).json({
      message: `Task marked as ${updatedTask.isDone ? "done" : "undone"}`,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await findTaskOrFail(taskId, res);
    console.log(task);

    if (!task) return;

    if (!checkOwnership(task, userId, res)) return;

    await Task.destroy({ where: { id: taskId } });

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
