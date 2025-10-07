import Task from "../models/Task.js";
import { findTaskOrFail, checkOwnership } from "../utils/taskUtils.js";

export const getTask = async (req, res) => {
  try {
    const allTasks = await Task.findAll();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTaskByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const allTasks = await Task.findAll({ where: { userId } });
    console.log(allTasks);

    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    const addTask = await Task.create({ title: title, userId: userId });
    await addTask.save();
    res.status(201).json({
      message: `${title} is added succesfully`,
      title: addTask.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const task = await findTaskOrFail(id, res);
    console.log(task);

    if (!task) return;

    if (!checkOwnership(task, userId, res)) return;

    const editTask = await Task.update({ title }, { where: { id } });

    res.status(201).json({
      message: `${title} is updated succesfully`,
      title: editTask.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await findTaskOrFail(id, res);
    if (!task) return;

    if (!checkOwnership(task, userId, res)) return;

    await Task.destroy();

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
