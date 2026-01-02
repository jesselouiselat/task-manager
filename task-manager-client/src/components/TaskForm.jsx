import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";

export default function TaskForm({ projectId, setTasks }) {
  const [newTask, setNewTask] = useState("");

  const addTask = async (event) => {
    event.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await axiosInstance.post("/task-manager/task/addTask", {
        projectId,
        content: newTask,
      });

      setTasks((prevTasks) => [...prevTasks, res.data.task]);
      setNewTask("");
    } catch (error) {
      console.error();
    }
  };

  return (
    <form action="" onSubmit={(e) => addTask(e)}>
      <input
        type="text"
        value={newTask}
        placeholder="Add task"
        className="mt-5 p-2 text-xl font-light tracking-tight text-white"
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <button
        type="submit"
        className="mt-8 mx-2 p-1 rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
      >
        Add
      </button>
    </form>
  );
}
