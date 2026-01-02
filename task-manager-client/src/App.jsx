import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Tasks from "./components/Tasks.jsx";
import Projects from "./components/Projects.jsx";
import Error from "./components/Error.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/error" element={<Error />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
