import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";

User.hasMany(Project, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "userId",
});

Project.hasMany(Task, {
  foreignKey: "projectKey",
  onDelete: "CASCADE",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
});
