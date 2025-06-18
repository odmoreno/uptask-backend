# Uptask Backend

A RESTful API for project and task management, built with Node.js, TypeScript, Express, and MongoDB.  
This backend is designed to support a productivity app, allowing users to create, update, and manage projects and their associated tasks.

## Features

- Project CRUD (Create, Read, Update, Delete)
- Task creation and association with projects
- MongoDB integration via Mongoose
- Modular code structure (controllers, models, routes, middleware)
- Barrel exports for clean imports
- Docker and Docker Compose support

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB (Mongoose)
- Docker

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)
- [MongoDB](https://www.mongodb.com/) (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/uptask-backend.git
   cd uptask-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string and any other required variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/uptask
     PORT=4000
     ```

### Running the App

#### Locally

```bash
npm run dev
# or
yarn dev
```

#### With Docker

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
2. The API will be available at `http://localhost:4000` (or the port you set).

### API Endpoints

#### Projects

- `POST   /api/projects` — Create a new project
- `GET    /api/projects` — List all projects
- `GET    /api/projects/:id` — Get a project by ID
- `PUT    /api/projects/:id` — Update a project
- `DELETE /api/projects/:id` — Delete a project

#### Tasks

- `POST   /api/projects/:projectId/tasks` — Create a task for a project

### Project Structure

```
src/
  config/         # Database configuration
  controllers/    # Request handlers (barrel export)
  middleware/     # Custom middleware
  models/         # Mongoose models (barrel export)
  routes/         # API route definitions
  index.ts        # App entry point
  server.ts       # Server setup
```

### Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### License

[MIT](LICENSE) 