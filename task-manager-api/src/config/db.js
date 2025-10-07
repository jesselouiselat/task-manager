import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task-manager", "postgres", "jesselouiselat", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

export default sequelize;
