import sequelize from "./config/db.js";
import app from "./app.js";

const port = 5000;

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // await sequelize.sync({ alter: true });
  // console.log("Models synced to the database.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
