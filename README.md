<h1 align="center">Full-Stack Todo Manager</h1>

<p align="center">
  A clean, responsive, and robust task management web application built with C# .NET 8 Web API and React.js.
</p>

## 🚀 Project Overview
This project is a complete full-stack CRUD application designed to help users efficiently track and categorize their daily tasks. Rather than just building a basic "hello world" todo app, my primary goal was to implement enterprise-level patterns—like Data Transfer Objects (DTOs), robust API exception handling middleware, and a highly modular React component structure.

For a deeper dive into the technical decisions, architecture, and system requirements, please check out the [Full Project Documentation](./Project_Documentation.md).

## ✨ Features
- **Complete CRUD Operations:** Create, read, update, and delete tasks seamlessly.
- **Dynamic Search:** Filter tasks instantly by keyword.
- **Task Prioritization:** Assign High, Medium, or Low priorities to keep focus on what matters.
- **Categorization Views:** Dedicated one-click filters for 'Work' and 'Personal' tasks.
- **Graceful Error Handling:** Custom global exception middleware ensures the UI receives clean, predictable error messages instead of raw server stack traces.

## 🛠️ Tech Stack
**Backend:**
- **Framework:** ASP.NET Core Web API 
- **Database:** SQLite (Lightweight, file-based relational database)
- **ORM:** Entity Framework Core (Code-First Migrations)

**Frontend:**
- **Library:** React.js
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Type Checking:** `prop-types` for component validation
- **HTTP Client:** Native `fetch` / Custom service layer

## 🏗️ Architecture Overview
The app strictly separates concerns. The frontend React application acts solely as the presentation layer, communicating via RESTful HTTP requests to the C# backend. The backend is responsible for all business logic, data validation, and database operations.

## 📂 Folder Structure
```text
TodoApp-Rajesh/
├── Project_Documentation.md   # Comprehensive project details and architecture
├── README.md                  # This file
├── TodoApi/                   # .NET Core Web API Backend
│   ├── Controllers/           # API endpoints routing and logic
│   ├── Data/                  # Entity Framework DbContext
│   ├── Middleware/            # Custom error-handling interceptors
│   ├── Models/                # Database entities and DTOs
│   └── appsettings.json       # API Configuration
└── todo-client/               # React JS Frontend
    ├── public/
    └── src/
        ├── components/        # Reusable UI parts (TodoList, TodoForm, etc.)
        ├── services/          # API integration layer (todoService.js)
        ├── App.js             # Root component
        └── index.css          # Global styling
```

## ⚙️ Installation & Setup Instructions

### Prerequisites
Make sure you have the following installed on your machine:
- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v16 or higher)

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd TodoApi
   ```
2. Apply database migrations to generate the local SQLite database file (`todo.db`):
   ```bash
   dotnet ef database update
   ```
   *(Note: If you don't have the EF Core tools installed globally, run `dotnet tool install --global dotnet-ef` first)*
3. Start the API server:
   ```bash
   dotnet run
   ```
   *The API will typically start on `http://localhost:5000` or `https://localhost:5001`.*

### 2. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd todo-client
   ```
2. Install the necessary Node dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The application will open in your browser at `http://localhost:3000`.*

## 🔌 API Endpoints Summary
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todo` | Retrieve all tasks |
| `GET` | `/api/todo/{id}` | Retrieve a specific task by ID |
| `GET` | `/api/todo/search?keyword=...` | Search tasks containing the keyword |
| `GET` | `/api/todo/category/{category}` | Filter tasks by category |
| `POST` | `/api/todo` | Create a new task |
| `PUT` | `/api/todo/{id}` | Update an existing task |
| `DELETE`| `/api/todo/{id}` | Remove a task |


## 🧠 Challenges Faced
The most significant challenge was implementing clean error handling across the entire backend. Initially, wrapping every controller method in `try/catch` blocks led to highly repetitive code. 
**Solution:** I researched ASP.NET Core request pipelines and implemented a custom `ExceptionMiddleware`. This intercepts all errors globally, logging them on the server while returning a clean, standardized JSON error object to the React frontend.

## 📚 Learning Outcomes
Through this project, I deepened my understanding of:
1. Designing clear API contracts using Data Transfer Objects (DTOs) to avoid leaking database schemas.
2. Managing complex local state and prop drilling in React without relying on heavy external libraries like Redux.
3. Securing an API with CORS policies and parameterizing queries through EF Core to prevent SQL injection.


