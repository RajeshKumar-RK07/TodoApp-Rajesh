# Full-Stack Todo Application - Project Documentation

## 1. Project Overview
The Full-Stack Todo Application is a comprehensive task management system designed to help users organize their daily activities efficiently. Built with a modern technology stack—ASP.NET Core Web API for the backend and React JS for the frontend—it provides a responsive, user-friendly interface backed by a robust and scalable server architecture. This project serves as a complete demonstration of enterprise-level application development, encompassing everything from database design to frontend state management.

## 2. Problem Statement
In today's fast-paced world, individuals frequently struggle to keep track of their personal and professional tasks. Traditional methods like paper notes or basic text files lack the ability to categorize, prioritize, and search through tasks effectively. There is a need for a streamlined digital solution that not only records tasks but also provides intelligent filtering, prioritization, and an intuitive user experience to boost productivity.

## 3. Objectives
* **Productivity Enhancement:** Provide users with a centralized platform to manage their tasks.
* **Seamless Organization:** Allow tasks to be categorized (e.g., Work, Personal) and prioritized (High, Medium, Low).
* **High Performance:** Ensure rapid response times for all operations (CRUD) using a lightweight RESTful API.
* **Reliability:** Implement robust exception handling so that users are never left confused by system errors.

## 4. Scope
The scope of this project encompasses the development of a web-based task management tool. It includes:
* A RESTful API backend handling data persistence, business logic, and error management.
* A dynamic Single Page Application (SPA) frontend for interacting with the API.
* A relational database for storing task records.
The current scope focuses on a single-user environment (no authentication/authorization) to prioritize core task management mechanics, with the foundation laid out for future multi-tenant capabilities.

## 5. Functional Requirements
* **CRUD Operations:** Users must be able to Create, Read, Update, and Delete todo items.
* **Search Functionality:** Users can search for specific tasks using keywords.
* **Priority Levels:** Every task must have an assigned priority (High, Medium, Low) to help users focus on urgent items.
* **Categories:** Tasks must be categorized (e.g., Work, Personal), and the UI must provide dedicated views ("View Work", "View Personal Todo") for quick filtering.

## 6. Non-Functional Requirements
* **Usability:** The frontend must be intuitive, clean, and responsive across different screen sizes.
* **Reliability:** The API must gracefully handle unexpected errors, returning standard HTTP status codes and user-friendly messages rather than stack traces.
* **Maintainability:** The codebase must follow clean code principles, separating concerns between UI components, API controllers, and database models.
* **Performance:** API endpoints should respond in under 200ms for standard queries.

## 7. Technology Stack
* **Backend:** ASP.NET Core Web API (.NET 8)
  * *Reasoning:* Provides a highly performant, strongly typed, and scalable framework for building enterprise REST APIs.
* **Frontend:** React JS
  * *Reasoning:* Enables the creation of a dynamic, component-based user interface that updates instantly without page reloads, providing a smooth UX.
* **Database:** SQLite
  * *Reasoning:* A lightweight, file-based relational database perfect for local development and small-to-medium scale applications without the overhead of managing a dedicated database server.
* **ORM:** Entity Framework Core (EF Core)
  * *Reasoning:* Simplifies data access by allowing developers to work with C# objects rather than writing raw SQL, while seamlessly managing database migrations.

## 8. System Architecture
The application follows a standard Client-Server architecture pattern:
```text
[ React JS Frontend ]  <--(HTTP/JSON)-->  [ ASP.NET Core Web API ]  <--(EF Core)-->  [ SQLite Database ]
(todo-client)                             (TodoApi)                                  (todo.db)
```
1. **Presentation Layer:** React components manage the UI and local state.
2. **Service Layer (Frontend):** Axios/Fetch wrappers handle HTTP requests to the backend.
3. **API Layer:** ASP.NET Controllers receive HTTP requests, validate input, and route to the data layer.
4. **Data Access Layer:** EF Core DbContext translates C# LINQ queries into SQL commands.

## 9. Database Design
The database consists of a single `Todos` table.
**Table: Todos**
* `Id` (Integer, Primary Key, Auto-increment)
* `Title` (String, Required) - The main task heading.
* `Description` (String, Optional) - Detailed notes about the task.
* `Priority` (String, Required) - Stored as 'High', 'Medium', or 'Low'.
* `Category` (String, Required) - Stored as 'Work' or 'Personal'.
* `IsCompleted` (Boolean) - Tracks if the task is done.
* `CreatedAt` (DateTime) - Timestamp of creation.

## 10. API Design
The backend exposes a RESTful interface. Key endpoints include:
* `GET /api/Todo` - Retrieves all tasks.
* `GET /api/Todo/{id}` - Retrieves a specific task.
* `POST /api/Todo` - Creates a new task. Requires Title, Priority, and Category.
* `PUT /api/Todo/{id}` - Updates an existing task.
* `DELETE /api/Todo/{id}` - Removes a task.
* `GET /api/Todo/search?keyword={kw}` - Returns tasks matching the keyword.
* `GET /api/Todo/category/{category}` - Returns tasks belonging to the specified category.

## 11. Frontend Design
The React frontend is divided into modular, reusable components:
* `App.js`: The root component managing the overall layout.
* `TodoList.js`: The main container managing state (todos, search queries, current filter) and fetching data.
* `TodoForm.js`: A controlled form component for creating and updating tasks.
* `TodoControls.js`: Contains the search bar and category filter buttons.
* `TodoItem.js`: Represents a single task card with edit and delete actions.

## 12. Backend Design
The ASP.NET Core backend is structured cleanly:
* **Controllers:** `TodoController.cs` acts as the entry point for API requests.
* **Models:** `TodoItem.cs` defines the data schema and validation rules (e.g., `[Required]`).
* **Data:** `AppDbContext.cs` manages the Entity Framework session with the SQLite database.
* **Middleware:** A custom exception handler ensures all unhandled errors are formatted correctly.

## 13. Exception Handling Strategy
Instead of wrapping every controller action in a `try-catch` block (which leads to duplicated code), the application utilizes a custom **Global Exception Middleware** (`ExceptionMiddleware.cs`). 
* **How it works:** It intercepts HTTP requests. If an exception occurs anywhere in the pipeline, it catches it, logs the issue, and returns a standardized HTTP 500 JSON response (`{ "message": "Something went wrong", "details": "..." }`).
* **Why it matters:** This prevents sensitive server information (stack traces) from leaking to the client while ensuring the frontend always receives a predictable error format it can display gracefully.

## 14. Security Considerations
While this is a foundational app, security best practices were observed:
* **Input Validation:** The backend uses Data Annotations (e.g., `[Required]`) and checks `ModelState.IsValid` to prevent malformed data from entering the database.
* **CORS (Cross-Origin Resource Sharing):** Configured strictly to allow requests only from the trusted React development server origin, preventing malicious sites from making unauthorized API calls.
* **SQL Injection Prevention:** By using Entity Framework Core, all database queries are parameterized by default, entirely mitigating SQL injection risks.

## 15. Project Workflow
1. **Planning:** Identified requirements (CRUD, Categories, Search).
2. **Backend Setup:** Bootstrapped the .NET API, created models, and generated EF Core migrations to create the SQLite DB.
3. **API Implementation:** Built the `TodoController` and tested endpoints using Swagger.
4. **Frontend Setup:** Initialized the React app and created the UI components.
5. **Integration:** Connected React to the API using service functions.
6. **Refinement:** Added the custom Exception Middleware and UI error handling.

## 16. Setup Instructions
### Prerequisites
* .NET 8 SDK
* Node.js (v16+)
* A code editor like Visual Studio Code

### Backend Setup
1. Navigate to the `TodoApi` directory.
2. Run `dotnet restore` to install dependencies.
3. Run `dotnet ef database update` to apply migrations and generate `todo.db`.
4. Run `dotnet run` to start the API (defaults to `http://localhost:5000` or `https://localhost:5001`).

### Frontend Setup
1. Navigate to the `todo-client` directory.
2. Run `npm install` to install React dependencies.
3. Run `npm start` to launch the frontend (defaults to `http://localhost:3000`).

## 17. Testing Strategy
* **Backend Validation:** Endpoints were manually validated using the built-in Swagger UI to ensure JSON payloads are parsed correctly and HTTP status codes (200 OK, 201 Created, 404 Not Found, 400 Bad Request) are returned appropriately.
* **Frontend Validation:** Tested across different viewport sizes to ensure CSS responsiveness. Verified that API failures (e.g., stopping the backend server) trigger the UI error message banners.

## 18. Deployment Approach
For deploying to a production environment:
* **Database:** Migrate from SQLite to a robust relational database like PostgreSQL or SQL Server.
* **Backend:** Publish the .NET application (`dotnet publish`) and host it on an Azure App Service, AWS EC2, or as a Docker container.
* **Frontend:** Build the React application (`npm run build`) and host the static files on platforms like Vercel, Netlify, or Azure Static Web Apps.

## 19. Challenges and Solutions
* **Challenge:** Duplicating error-handling logic across multiple controller methods.
  * **Solution:** Abstracted error handling into a Global Exception Middleware. This made the controllers much cleaner and centralized error formatting.
* **Challenge:** Managing complex state in the React frontend (Search + Category Filtering).
  * **Solution:** Consolidated state management in the `TodoList` component and passed down explicitly required state via props to child components, ensuring a single source of truth.

## 20. Future Enhancements
To elevate this project to a fully production-ready SaaS product, the following features are planned:
1. **Authentication & Authorization:** Integrate ASP.NET Core Identity and JWT (JSON Web Tokens) so multiple users can register and securely manage their own private lists.
2. **Pagination:** Implement pagination on the backend to handle thousands of tasks without degrading performance.
3. **Drag and Drop:** Add UI libraries to allow users to drag tasks to reorder them or change their categories dynamically.
4. **Automated Testing:** Implement xUnit for backend unit testing and Jest/React Testing Library for frontend component testing.

## 21. Conclusion
The Full-Stack Todo Application successfully meets all initial requirements, providing a robust, error-resistant, and user-friendly task management solution. By strictly separating concerns between the frontend React application and the backend .NET Web API, the architecture remains highly maintainable and primed for future scalability.
