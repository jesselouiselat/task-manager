import axiosInstance from "../api/AxiosInstance";
class ProjectServices {
  constructor() {
    this.projects = [];
    this.projectTitle = "";
  }

  async fetchProjectsByUser() {
    try {
      const res = await axiosInstance.get(
        "/task-manager/project/getProjectByUser/"
      );
      this.projects = res.data;
      return res.data;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async updateTitle(projectId, title) {
    try {
      const res = await axiosInstance.put(
        `/task-manager/project/editProject/${projectId}/`,
        { title }
      );
      this.projectTitle = res.data;
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProject(projectId) {
    try {
      const res = await axiosInstance.delete(
        `/task-manager/project/deleteProject/${projectId}`
      );
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default ProjectServices;
