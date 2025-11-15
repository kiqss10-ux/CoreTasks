# CoreTasks CRUD APIs

A full-stack task management system built with Node.js, Express, PostgreSQL, and a simple frontend in HTML/CSS/JavaScript.

## Features

- Create, read, update, and delete tasks
- PostgreSQL database integration
- Frontend connected via Fetch API
- Input validation
- Error handling middleware
- Lightweight and easy to deploy locally

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Joi (validation)
- CORS support

## Frontend

- HTML
- CSS
- PostgreSQL
- JavaScript (Fetch API)

## Database

- PostgreSQL (SQL schema included)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/kiqss10-ux/CoreTasks.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=3001
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=your_database_name
   ```

4. Set up the PostgreSQL database
   ```
   Create the tasks table:
   CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Usage

Start the development server:
```
npm run dev
```
Start Frontend
```
fetch("http://localhost:3001/api/tasks")
  .then(res => res.json())
  .then(data => console.log(data));

```

The API will be available at `http://localhost:3001`.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure
coretasks/
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── index.html
│   ├── edit.html
│   ├── newtask.html
│   ├── style.css
│   └── script.js
│
└── database/
    ├── schema.sql
    └── backup.sql (optional)

## License

ISC