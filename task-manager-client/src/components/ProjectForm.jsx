import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";

export default function ProjectForm({ setProjects }) {
  const [newProject, setNewProject] = useState("");

  const addProject = async (event) => {
    event.preventDefault();
    if (!newProject.trim()) return;

    try {
      const res = await axiosInstance.post("/task-manager/project/addProject", {
        title: newProject,
      });

      setProjects((prev) => [res.data, ...prev]);
      setNewProject("");
    } catch (error) {
      console.error("Error adding project", error);
    }
  };

  return (
    <div className="px-6 ">
      <form
        onSubmit={addProject}
        className="p-6 mx-auto rounded-lg flex  justify-center  bg-gray-900 mt-6"
      >
        <input
          type="text"
          value={newProject}
          placeholder="Add New Project"
          className="m-5 p-2 text-xl font-light tracking-tight text-white "
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button
          type="submit"
          className="my-auto rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
}
