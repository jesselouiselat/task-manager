import express from "express";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  console.log("Working!");
  res.send("Route is working!");
});

app.use("/task-manager/auth", authRoutes);
app.use("/task-manager/project", projectRoutes);
app.use("/task-manager/task", taskRoutes);

export default app;
