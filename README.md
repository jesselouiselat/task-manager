## Task Manager

A full-stack Task Manager application allowing users to register/login, create projects, add tasks, and track progress. Built with a Node.js/Express + Sequelize (Postgres) API and a React + Vite frontend.

---

### Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started--prerequisites)
5. [Environment Variables](#environment-recommended)
6. [Running Locally](#install--run-locally)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

---

### Features

- User registration & authentication (JWT)
- Create, edit, delete projects
- Create, edit, toggle status, delete tasks
- Task views by project and by user
- Protected routes (JWT auth)
- Responsive React client with Axios integration

---

### Tech Stack

- Backend: Node.js, Express, Sequelize, PostgreSQL
- Auth: bcrypt, jsonwebtoken
- Frontend: React, Vite, Axios, Tailwind / Bootstrap (UI)
- Dev tools: nodemon, ESLint

---

### Project Structure

Key folders/files:

- task-manager-api — Backend
  - server.js, `src/app.js`
  - db.js (DB config)
  - `src/controllers/` (auth, project, task)
  - `src/routes/` (auth, project, task)
  - `src/models/` (User, Project, Task)
- task-manager-client — React client
  - AxiosInstance.js
  - `src/components/` (UI components)
  - `src/services/` (ProjectServices, TaskServices)

---

### Getting Started — Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn)
- PostgreSQL

---

### Environment (recommended)

Create a `.env` file for the API with environment variables (example below). Note: the current codebase contains hard-coded DB/JWT values — replace those with env vars before production.

.env.example:

```bash
# Backend
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME=task-manager
JWT_SECRET=your_jwt_secret

# Frontend (if needed)
VITE_API_BASE_URL=http://localhost:5000
```

---

### Install & Run Locally

1. Clone the repo:

```bash
git clone https://github.com/jesselouiselat/task-manager.git
cd task-manager
```

2. Backend:

```bash
cd task-manager-api
npm install
npm run dev   # starts server with nodemon

```

3. Frontend:

```bash
cd ../task-manager-client
npm install
npm run dev   # starts Vite dev server (default port often 5173)
```

- API base URL used in client: `http://localhost:5000/` (see AxiosInstance.js)

---

### API Endpoints

Auth:

- POST `/auth/register` — register (returns JWT)
- POST `/auth/login` — login (returns JWT + user)

Projects (protected):

- GET `/project/getProjectByUser/` — get projects for the logged-in user
- POST `/project/addProject` — add project
- PUT `/project/editProject/:id` — edit project
- DELETE `/project/deleteProject/:id` — delete project

Tasks (protected):

- GET `/task/getTaskByProject/:projectId` — tasks for a project
- GET `/task/getTaskByUser/` — tasks for the logged-in user
- POST `/task/addTask` — add a task
- PUT `/task/editTask/:taskId` — edit a task
- PATCH `/task/editTaskStatus/:taskId` — toggle task status
- DELETE `/task/deleteTask/:taskId` — delete a task

All protected routes require a valid `Bearer <token>` Authorization header.

---

### Contributing

- Please open issues for bugs/feature requests.
- For pull requests: fork, create a feature branch, add tests as needed, and submit a PR with a clear description.

---

### License

This project is open-sourced under the [MIT License](./LICENSE).

---
