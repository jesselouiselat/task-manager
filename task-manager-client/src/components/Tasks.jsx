import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import TaskForm from "./TaskForm.jsx";
import TaskServices from "../services/TaskServices.js";
import ProgressBar from "./ProgressBar.jsx";

export default function Tasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState("");

  const taskServices = new TaskServices();

  useEffect(() => {
    const fetchTasksByUser = async () => {
      const res = await taskServices.fetchTasksByUser(projectId);
      setTasks(res);
    };
    if (projectId) fetchTasksByUser();
  }, [projectId]);

  const updateTask = async (event, taskId) => {
    event.preventDefault();
    try {
      const res = await taskServices.updateTask(taskId, taskToEdit);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, content: taskToEdit } : task
        )
      );
      setEditingTaskId(null);

      setTaskId(null);
    } catch (error) {
      console.error("Error found", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await taskServices.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error found", error);
    }
  };

  const handleToggleTaskStatus = async (taskId) => {
    try {
      const res = await axiosInstance.patch(
        `/task-manager/task/editTaskStatus/${taskId}`
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          taskId === task.id ? { ...task, isDone: !task.isDone } : task
        )
      );
    } catch (error) {
      console.error("Error found", error);
    }
  };

  return (
    <div>
      <ProgressBar worksArray={tasks} label="Tasks" />

      {tasks.map((task) => (
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
          key={task.id}
        >
          <li className="flex gap-x-3">
            <input
              type="checkbox"
              className="h-6 w-5 flex-none text-white"
              name=""
              id=""
              checked={task.isDone}
              onChange={() => handleToggleTaskStatus(task.id)}
            />
            {editingTaskId === task.id ? (
              <form action="" onSubmit={(e) => updateTask(e, task.id)}>
                <input
                  value={taskToEdit}
                  type="text"
                  className="p-2 text-m font-light tracking-tight text-white"
                  onChange={(e) => setTaskToEdit(e.target.value)}
                />

                <button
                  type="submit"
                  className="ml-2 p-2 rounded-md font-semibold  bg-blue-500 text-white hover:bg-blue-400"
                >
                  Update
                </button>
              </form>
            ) : (
              <span
                onClick={() => setTaskId(task.id)}
                className={task.isDone ? "line-through text-blue-300" : ""}
              >
                {task.content}
              </span>
            )}

            {taskId === task.id && (
              <div>
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setTaskToEdit(task.content);
                    setTaskId(null);
                  }}
                  className="ml-2 p-2 rounded-md font-semibold  bg-green-500 text-white hover:bg-green-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 p-2 rounded-md font-semibold  bg-red-500 text-white hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        </ul>
      ))}
      <TaskForm projectId={projectId} setTasks={setTasks} />
    </div>
  );
}
