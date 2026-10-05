# DevOps Platform Challenge

## Project purpose

This project is a small Node.js application developed as part of a DevOps and platform engineering challenge.

The goal is to practice a complete development workflow including:

* Git and GitHub
* Feature branches
* Pull Requests and code reviews
* Automated testing
* Code quality checks
* Docker
* GitHub Actions
* Terraform validation
* Project documentation

The project is intentionally designed to include development and DevOps tasks that must be completed by the team.

## Architecture

```text
platform-challenge/
├── src/
│   └── app.js
├── test/
│   └── app.test.js
├── terraform/
│   ├── main.tf
│   └── README.md
├── .github/
│   └── workflows/
├── package.json
├── package-lock.json
└── README.md
```

The application is built with Node.js and Express.

Terraform is used for local infrastructure configuration validation. No cloud provider is required.

## Prerequisites

The following tools are required:

* Node.js
* npm
* Git
* Docker
* Terraform

## Local setup

Clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd platform-challenge
npm install
```

## Running the application

Start the application with:

```bash
npm start
```

The application listens on port `3000`.

Open:

```text
http://localhost:3000
```

## Testing

Run the automated tests:

```bash
npm test
```

Run the linter:

```bash
npm run lint
```

The project uses Node.js built-in test tools and ESLint.

## API

### GET /

Returns the application status.

### GET /health

Returns the health status of the application.

### GET /tasks

Returns the list of tasks as a JSON array.

Example response:

```json
[
  {
    "id": 1,
    "title": "Configurer le projet",
    "completed": false
  },
  {
    "id": 2,
    "title": "Ajouter GET /tasks",
    "completed": false
  }
]
```

The endpoint returns HTTP `200` when successful.

## Docker

The project uses Docker to containerize the Node.js application.

The Docker workflow is
