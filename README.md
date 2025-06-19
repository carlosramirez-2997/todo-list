# To-Do App

To-Do application built with Node.js, Express.js, MongoDB, and Redis for session management.

## Installation

Clone the repository:

```bash
git clone https://github.com/carlosramirez-2997/todo-app.git
cd todo-app
```

Install dependencies:

```bash
npm install
```
 
Set up environment variables by editing `.env` existing file.

Start MongoDB and Redis, then run the application:

```bash
npm start
```

The server should be running on `http://localhost:3000`.

## Usage

### Authentication

```http
POST /register   # Register a new user
POST /login      # Login a user
POST /logout     # Logout the user
```

### Tasks

```http
GET /tasks        # Get all tasks
POST /tasks       # Create a new task
PUT /tasks/:id    # Update a task
```

## Folder Structure

```bash
/todo-app
 /src
  ├── config        # Database and Redis configurations
  ├── controllers   # Business logic
  ├── middleware    # Authentication and session handling
  ├── models        # Mongoose schemas
  ├── public        # Static assets
  ├── routes        # Express routes
  ├── views         # Frontend templates (if applicable)
  ├── app.js        # Main entry point
└── .env          # Environment variables
```

## Future Improvements

- Implement real-time updates with WebSockets
- Add task due dates and notifications
- Implement OAuth for authentication

## License

Carlos Alberto Ramirez Otero

