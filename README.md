# **TODO Application**

## Description

This project is a **Todo Application** built with **Express.js**, **Mongoose**, and **TypeScript**. It allows users to create, manage, and track their tasks (todos). The system includes user authentication with JWT tokens, data validation, and provides features like scheduling and marking tasks as completed.

## Installation Guide

To get started with this project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mohitsisodiya09/todo-application.git
    cd your-project-name
    ```

2. **Install dependencies**:
    This project uses **Node.js** and **npm** (Node package manager). To install the required dependencies, run:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root directory of the project.
    - Copy the content from `.sample.env` to `.env` and modify the values as needed.
      You can find the sample file here: [**.sample.env**](./.sample.env).

4. **Start the server**:
    Once the dependencies are installed and environment variables are set up, start the server:
    ```bash
    npm run serve
    ```

    This will start the server at `http://localhost:3000`.

## Available Scripts

Here are the available npm scripts in the project:

- **`start`**: Starts the server after building the project. The entry point is `dist/src/server.js`.
  ```bash
  npm run start
  ```

- **`start:dev`**: Starts the development server with `nodemon` and `ts-node` for live reloading.
  ```bash
  npm run start:dev
  ```

## Features

### 1. **User Authentication**
   - **Signup**: Allows new users to register by providing `firstName`, `lastName`, `email`, `password`.
   - **Login**: Users can log in using their `email` and `password`, receiving a JWT token for subsequent requests.

### 2. **Todo Management**
   - **Create Todo**: Users can create a new todo by providing a `title`, `description`, and `dueDate`.
   - **Get Todos**: Users can retrieve their list of todos.
   - **Get Todo by ID**: Users can fetch a specific todo by its ID.
   - **Update Todo**: Users can update the details of a todo.
   - **Delete Todo**: Users can delete a todo from their list.

### 3. **CRON Jobs for Task Management**
   - A **CRON job** runs daily at midnight to mark todos that are past their due date as completed.

---

## Additional Features & Configuration

### 1. **GitHub Workflows (.github)**
   - This project uses **GitHub Actions** for CI/CD workflows.
   - Workflows include:
     - **Linting**: Automatically checks code for linting errors.
     - **Testing**: Runs unit and integration tests.
     - **Deployment**: Deploys to production after successful tests.

### 2. **Commit Messages & Pre-commit Hooks (.husky)**
   - **Husky** is configured to enforce certain rules for commit messages and ensure code quality before each commit.
     - **Commitlint**: Ensures commit messages follow a defined pattern.
     - **Pre-commit hooks**: Automatically runs linting and formatting checks before commits are made.

### 3. **Workspace Setup (.vscode)**
   - A pre-configured **VSCode workspace** has been added to ensure consistent settings across all contributors.
     - Includes settings for **auto-formatting** and **linting**.

### 4. **Linting, Prettier, and TypeScript Configuration**
   - **ESLint**: Configured for linting JavaScript/TypeScript files.
   - **Prettier**: Ensures consistent code formatting across the project.
   - **tsconfig.json**: Configures TypeScript options to ensure consistent compilation.

### 5. **Lint-staged, Commitlint, and Release Configuration**
   - **Lint-staged**: Ensures that only staged files are linted and formatted before committing.
   - **Commitlint**: Verifies that commit messages follow the **Conventional Commits** standard.
   - **Release Configuration**: Automates versioning and changelog generation using **semantic-release**.

### 6. **Node.js Version Check**
   - A **check-node-version** script is included to verify the Node.js version.
   - Prevents compatibility issues by ensuring the correct Node.js version is being used.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
### **Mohit Sisodiya**