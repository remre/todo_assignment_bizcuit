# Todo App

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Minimum Requirements](#minimum-requirements)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Testing](#testing)
- [Design Choices and Approach](#design-choices-and-approach)

## Introduction

Todo App is a web application that allows users to manage their tasks efficiently. Users can register, log in, create tasks, group them, and manage their statuses. The project is built with a React frontend and a Node.js/Express backend.

## Technologies Used

### Frontend

- React
- React Router
- Context API
- Axios
- TailwindCSS
- Vite

### Backend

- Node.js
- Express
- Axios
- Dotenv
- SQLite

### Development Tools

- ESLint
- Prettier
- Vitest
- Supertest

## Minimum Requirements

- Node.js v14 or higher
- npm v6 or higher

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/remre/todo_app_try.git
```

2. Install dependencies for both client and server:

```sh
  # For client
  cd frontend
  npm install

 # For server
  cd backend
  npm install
```

3. Create a .env file in the backend directory based on the .env.example file:

## Running the Application

### Backend

To start the backend application, navigate to the `backend` directory and run:

```bash
npm start
```

### Frontend

To start the frontend application, navigate to the `frontend` directory and run:

```bash
npm run dev
```

## Testing

- Vitest and Supertest are used for testing the backend. To run the tests, navigate to the backend directory and run:

```bash
npm test
```

This will execute all the test cases, ensuring the backend functionality is working as expected.

## Features

- User Registration and Login: Users can register and log in using JWT for authentication.
- Task Management: Users can create, update, delete, and view tasks.
- Grouping Tasks: Tasks can be grouped. If no group is specified, tasks are added to a default "General" group.
- Task Status: Tasks can be marked as done or undone.
- Sorting Tasks: Tasks can be sorted by various criteria.

## Design Choices and Approach

### Lightweight and Fast Development

For the frontend, we chose Vite over traditional tools like Create React App because Vite is lightweight and offers faster development and build times. This decision was made to enhance developer productivity and improve the overall development experience.

### State Management with Context API

We used the Context API for state management in the frontend. This allows us to manage global state efficiently and pass data through the component tree without having to pass props down manually at every level. This approach simplifies state management and makes the codebase more maintainable.

### Efficient Task Management

The application allows users to manage tasks efficiently by grouping them. If a user does not specify a group, tasks are automatically added to a default "General" group. This design choice ensures that tasks are always organized, even if the user does not actively manage groups.

### User-Friendly Features

We focused on providing a user-friendly experience by allowing users to mark tasks as done or undone, edit tasks, and delete tasks. Additionally, tasks can be sorted by various criteria, making it easier for users to manage their to-do lists.

### Secure Authentication

For authentication, we used JWT to ensure secure and stateless user sessions. This approach provides a scalable solution for managing user authentication and authorization.

### Robust Testing

To ensure the reliability of the backend, we used Vitest and Supertest for testing. These tools provide a robust framework for writing and running tests, ensuring that the backend functions correctly and efficiently.
