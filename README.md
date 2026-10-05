# DevOps Platform Challenge

## Project purpose

This project is a Node.js application developed as part of a DevOps and platform engineering challenge.

The goal is to implement and demonstrate a complete collaborative development workflow including:

- Git and GitHub
- Feature branches
- Issues and Pull Requests
- Code reviews
- Automated testing
- GitHub Actions
- Docker
- GitHub Container Registry (GHCR)
- Terraform validation
- Project documentation

## Architecture

```text
platform-challenge/
├── .github/
│   └── workflows/
│       ├── node-ci.yml
│       ├── docker.yml
│       └── terraform.yml
├── src/
│   └── app.js
├── test/
│   └── app.test.js
├── terraform/
│   ├── main.tf
│   └── README.md
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

The application is built with Node.js and Express.

Terraform is used for infrastructure configuration validation. No cloud provider is required.

## Prerequisites

The following tools are required:

- Node.js
- npm
- Git
- Docker
- Terraform

## Local setup

Clone the repository:

```bash
git clone https://github.com/MELI0-dot/platform-challenge.git
cd platform-challenge
```

Install dependencies:

```bash
npm install
```

## Running the application

Start the application:

```bash
npm start
```

The application listens on port `3000`.

The health endpoint is available at:

```text
http://localhost:3000/health
```

## Testing

Run the automated tests:

```bash
npm test
```

The test suite validates the application logic and the task API endpoints.

## API

### GET /

Returns information about the application.

### GET /health

Returns the health status of the application.

Example:

```json
{
  "status": "healthy"
}
```

### GET /tasks

Returns all tasks.

Example:

```json
[
  {
    "id": 1,
    "title": "First task",
    "completed": false
  },
  {
    "id": 2,
    "title": "Second task",
    "completed": false
  }
]
```

Successful response: `200 OK`.

### POST /tasks

Creates a new task.

Example request:

```json
{
  "title": "New task"
}
```

Example response:

```json
{
  "id": 3,
  "title": "New task",
  "completed": false
}
```

Successful response: `201 Created`.

An empty or invalid title returns `400 Bad Request`.

### PATCH /tasks/:id

Updates the completion status of an existing task.

Example request:

```json
{
  "completed": true
}
```

Successful response: `200 OK`.

An unknown task returns `404 Not Found`.

Invalid input returns `400 Bad Request`.

### DELETE /tasks/:id

Deletes an existing task.

Successful response: `204 No Content`.

An unknown task returns `404 Not Found`.

## Continuous Integration

The Node.js workflow is located at:

```text
.github/workflows/node-ci.yml
```

It automatically:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies with `npm ci`.
4. Runs the automated tests with `npm test`.

The workflow runs on pull requests and pushes to `main`.

## Docker

Build the Docker image locally:

```bash
docker build -t platform-challenge .
```

Run the container:

```bash
docker run -p 3000:3000 platform-challenge
```

The application is then available on port `3000`.

The Docker GitHub Actions workflow is located at:

```text
.github/workflows/docker.yml
```

It builds the Docker image and publishes images from `main` to GitHub Container Registry (GHCR).

## Terraform

Terraform configuration is stored in:

```text
terraform/
```

The Terraform CI workflow automatically executes:

```bash
terraform fmt -check -diff -recursive
terraform init -backend=false
terraform validate
```

The workflow runs when Terraform configuration or its workflow is modified.

No cloud provider is required for this challenge.

## Git workflow

Development is performed using feature branches.

The expected workflow is:

```text
Issue
  ↓
Feature branch
  ↓
Development and tests
  ↓
Pull Request
  ↓
CI checks
  ↓
Code review and approval
  ↓
Merge into main
```

Direct development on `main` is avoided.

Pull requests must pass the required checks and receive the required approval before being merged.

## Team

This project was completed collaboratively as part of the DevOps Platform Challenge.