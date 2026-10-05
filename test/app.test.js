const test = require("node:test");

const assert = require("node:assert/strict");

const { app, calculateTotal, tasks, resetTasks } = require("../src/app");
 
test("calculates the total for several items", () => {

  const items = [

    { price: 10, quantity: 2 },

    { price: 5, quantity: 3 }

  ];
 
  assert.equal(calculateTotal(items), 35);

});
 
test("returns zero for an empty basket", () => {

  assert.equal(calculateTotal([]), 0);

});
 
test("does not mutate the input items", () => {

  const items = [{ price: 4, quantity: 2 }];

  const copy = JSON.parse(JSON.stringify(items));
 
  calculateTotal(items);
 
  assert.deepEqual(items, copy);

});
 
/*

* POST /tasks tests

*/
 
test("POST /tasks creates a new task", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        title: "New task"

      })

    });
 
    assert.equal(response.status, 201);
 
    const body = await response.json();
 
    assert.equal(body.title, "New task");

    assert.equal(body.completed, false);

    assert.equal(typeof body.id, "number");

    assert.equal(tasks.some((task) => task.id === body.id), true);

  } finally {

    server.close();

    resetTasks();

  }

});
 
test("POST /tasks returns 400 for an empty title", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        title: ""

      })

    });
 
    assert.equal(response.status, 400);

  } finally {

    server.close();

    resetTasks();

  }

});
 
/*

* PATCH /tasks/:id tests

*/
 
test("PATCH /tasks/:id updates an existing task", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks/1`, {

      method: "PATCH",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({ completed: true })

    });
 
    assert.equal(response.status, 200);
 
    const body = await response.json();
 
    assert.equal(body.id, 1);

    assert.equal(body.completed, true);

  } finally {

    server.close();

    resetTasks();

  }

});
 
test("PATCH /tasks/:id returns 404 for an unknown task", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks/999`, {

      method: "PATCH",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({ completed: true })

    });
 
    assert.equal(response.status, 404);

  } finally {

    server.close();

    resetTasks();

  }

});
 
test("PATCH /tasks/:id returns 400 for invalid input", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks/1`, {

      method: "PATCH",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({ completed: "yes" })

    });
 
    assert.equal(response.status, 400);

  } finally {

    server.close();

    resetTasks();

  }

});
 
/*

* DELETE /tasks/:id tests

*/
 
test("DELETE /tasks/:id deletes an existing task", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks/1`, {

      method: "DELETE"

    });
 
    assert.equal(response.status, 204);

    assert.equal(tasks.some((task) => task.id === 1), false);

  } finally {

    server.close();

    resetTasks();

  }

});
 
test("DELETE /tasks/:id returns 404 for an unknown task", async () => {

  resetTasks();
 
  const server = app.listen(0);
 
  try {

    const { port } = server.address();
 
    const response = await fetch(`http://localhost:${port}/tasks/999`, {

      method: "DELETE"

    });
 
    assert.equal(response.status, 404);

    assert.equal(tasks.length, 2);

  } finally {

    server.close();

    resetTasks();

  }

});
 