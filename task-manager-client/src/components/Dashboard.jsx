import { useState, useEffect } from "react";
import NavBar from "./partials/NavBar.jsx";
import axiosInstance from "../api/AxiosInstance.js";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [numberOfProjects, setNumberOfProjects] = useState();
  const [numberOfTasks, setNumberOfTasks] = useState();

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
      const res = await axiosInstance.get(
        `/task-manager/task/getTaskByProject/${projectId}`
      );
      setTasks(res.data);
      setNumberOfTasks(res.data.length);
    };
    if (projectId) fetchTasksByUser();
  }, [projectId]);

  return (
    <>
      <NavBar />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">
                Number of
                <span className="font-bold text-black-900"> Projects</span>
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {numberOfProjects}
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
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">New users annually</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                46,000
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
