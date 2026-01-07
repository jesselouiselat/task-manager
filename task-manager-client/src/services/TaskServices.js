import axiosInstance from "../api/AxiosInstance";

class TaskServices {
  constructor() {
    this.tasks = [];
    this.taskToEdit = "";
  }

  async fetchTasksByUser(projectId) {
    try {
      const res = await axiosInstance.get(
        `/task-manager/task/getTaskByProject/${projectId}`
      );
      this.tasks = res.data;
      return res.data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateTask(taskId, taskToEdit) {
    try {
      const res = await axiosInstance.put(
        `/task-manager/task/editTask/${taskId}`,
        { content: taskToEdit }
      );
      this.taskToEdit = res.data;
      return res.data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async deleteTask(taskId) {
    try {
      const res = await axiosInstance.delete(
        `/task-manager/task/deleteTask/${taskId}`
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

export default TaskServices;
