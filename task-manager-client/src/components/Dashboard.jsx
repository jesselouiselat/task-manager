import { useState, useEffect } from "react";
import NavBar from "./partials/NavBar.jsx";
import axiosInstance from "../api/AxiosInstance.js";
import ProgressBar from "./ProgressBar.jsx";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [numberOfProjects, setNumberOfProjects] = useState();
  const [numberOfTasks, setNumberOfTasks] = useState();

  const [numberOfProjectsFinished, setNumberOfProjectsFinished] = useState(0);
  const [numberOfTasksFinished, setnumberOfTasksFinished] = useState(0);

  const [projectId, setProjectId] = useState("");

  const stats = [
    {
      finishedLabel: "Projects Finished",
      totalLabel: "Projects",
      finishedCount: numberOfProjectsFinished,
      totalCount: numberOfProjects,
    },
    {
      finishedLabel: "Tasks Finished",
      totalLabel: "Tasks",
      finishedCount: numberOfTasksFinished,
      totalCount: numberOfTasks,
    },
  ];

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
            {stats.map((stat, index) => (
              <dl className="grid bg-gray-900 border-2 border-gray-900 rounded-2xl py-8 gap-8">
                <div className="mx-auto flex max-w-md flex-col gap-y-4">
                  <dt className="text-base/6 text-gray-400">
                    Number of
                    <span className="font-bold text-black-900">
                      {" "}
                      {stat.finishedLabel}
                    </span>
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-200 sm:text-5xl">
                    {stat.finishedCount}
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base/7 text-gray-400">
                    Number of
                    <span className="font-bold text-black-900">
                      {" "}
                      {stat.totalLabel}
                    </span>
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-200 sm:text-5xl">
                    {stat.totalCount}
                  </dd>
                </div>
                <ProgressBar
                  totalWork={stat.totalCount}
                  completedWorks={stat.finishedCount}
                  label={stat.totalLabel}
                />
              </dl>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
