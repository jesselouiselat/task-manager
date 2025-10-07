import express from "express";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());

// app.use(cors({ origin }));

app.get("/test", (req, res) => {
  console.log("Working!");
  res.send("Route is working!");
});

app.use("/task-manager/auth", authRoutes);
app.use("/task-manager/project", projectRoutes);

export default app;
