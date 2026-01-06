import { useState, useEffect } from "react";
import NavBar from "./partials/NavBar.jsx";
import axiosInstance from "../api/AxiosInstance.js";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [numberOfProjects, setNumberOfProjects] = useState();
  const [numberOfTasks, setNumberOfTasks] = useState();

  const [numberOfProjectsFinished, setNumberOfProjectsFinished] = useState(0);
  const [numberOfTasksFinished, setnumberOfTasksFinished] = useState(0);

  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    const fetchProjectsByUser = async () => {
      const res = await axiosInstance.get(
        "/task-manager/project/getProjectByUser/"
      );

      setProjects(res.data);
      setNumberOfProjects(res.data.length);
      if (res.data.length > 0) {
        setProjectId(res.data[0].id);
      }
    };
    fetchProjectsByUser();
  }, []);

  useEffect(() => {
    const fetchTasksByUser = async () => {
      const res = await axiosInstance.get(`/task-manager/task/getTaskByUser/`);
      setTasks(res.data);

      setNumberOfTasks(res.data.length);
    };
    if (projectId) fetchTasksByUser();
  }, [projectId]);
  useEffect(() => {
    const fetchProjectsByUser = async () => {
      const res = await axiosInstance.get(
        "/task-manager/project/getProjectByUser/"
      );
      setProjects(res.data);
      if (res.data.length > 0) {
        setProjectId(res.data[0].id);
      }
    };
    fetchProjectsByUser();
  }, []);

  useEffect(() => {
    const fetchTasksByUser = async () => {
      const res = await axiosInstance.get("/task-manager/task/getTaskByUser/");
      setTasks(res.data);
    };
    if (projectId) fetchTasksByUser();
  }, [projectId]);

  useEffect(() => {
    setNumberOfProjects(projects.length);
    setNumberOfTasks(tasks.length);
    setnumberOfTasksFinished(tasks.filter((t) => t.isDone).length);

    let finishedProjectCount = 0;
    const tasksByProject = {};

    for (const task of tasks) {
      if (!tasksByProject[task.projectId]) tasksByProject[task.projectId] = [];
      tasksByProject[task.projectId].push(task);
    }

    for (const pId in tasksByProject) {
      if (tasksByProject[pId].every((t) => t.isDone)) {
        finishedProjectCount++;
      }
    }

    setNumberOfProjectsFinished(finishedProjectCount);
  }, [projects, tasks]);

  return (
    <>
      <NavBar />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="lg:mx-30 grid grid-cols-1 gap-x-30 gap-y-16 text-center lg:grid-cols-2">
            <dl className="grid border-2 border-gray-400 rounded-2xl py-8 gap-8">
              <div className="mx-auto flex max-w-md flex-col gap-y-4">
                <dt className="text-base/6 text-gray-600">
                  Number of
                  <span className="font-bold text-black-900">
                    {" "}
                    Projects Finished
                  </span>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {numberOfProjectsFinished}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">
                  Number of
                  <span className="font-bold text-black-900"> Projects</span>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {numberOfProjects}
                </dd>
              </div>
            </dl>
            <dl className="grid border-2 border-gray-400 rounded-2xl py-8 gap-8">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">
                  Number of
                  <span className="font-bold text-black-900">
                    {" "}
                    Tasks Finished
                  </span>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {numberOfTasksFinished}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">
                  Number of
                  <span className="font-bold text-black-900"> Tasks</span>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {numberOfTasks}
                </dd>
              </div>
            </dl>
          </dl>
        </div>
      </div>
    </>
  );
}
