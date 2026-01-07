import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance.js";
import NavBar from "./partials/NavBar.jsx";
import ProjectForm from "./ProjectForm.jsx";
import Tasks from "./Tasks.jsx";
import ProjectServices from "../services/ProjectServices.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [title, setTitle] = useState("");

  const projectServices = new ProjectServices();

  useEffect(() => {
    try {
      const fetchProjectsByUser = async () => {
        const data = await projectServices.fetchProjectsByUser();
        setProjects(data);
      };
      fetchProjectsByUser();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const updateTitle = async (event, projectId) => {
    event.preventDefault();
    try {
      const data = await projectServices.updateTitle(projectId, title);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, title } : project
        )
      );
      setEditingProjectId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (projectId) => {
    console.log(projectId);

    try {
      const data = await projectServices.deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
      setEditingProjectId(null);
    } catch (error) {
      console.error("Error found", error);
    }
  };

  return (
    <>
      <NavBar />
      <ProjectForm setProjects={setProjects} />
      <div className="p-6 mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10"
          >
            <div className="mt-4 flex items-baseline gap-x-2">
              {editingProjectId === project.id ? (
                <>
                  <form
                    action=""
                    onSubmit={(e) => {
                      updateTitle(e, project.id);
                    }}
                  >
                    <input
                      type="text"
                      className="text-5xl font-semibold tracking-tight text-white"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
                      >
                        Save
                      </button>
                      <span
                        onClick={() => deleteProject(project.id)}
                        className="mt-8 block rounded-md bg-red-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
                      >
                        Delete
                      </span>
                    </div>
                  </form>
                </>
              ) : (
                <span
                  className=" text-center justify-center text-5xl font-semibold tracking-tight text-white"
                  onClick={() => {
                    setEditingProjectId(project.id);
                    setTitle(project.title);
                  }}
                >
                  {project.title}
                </span>
              )}
            </div>
            <Tasks projectId={project.id} />
          </div>
        ))}
      </div>
    </>
  );
}
