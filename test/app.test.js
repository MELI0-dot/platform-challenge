//const test = require("node:test");
//const assert = require("node:assert/strict");
//const { calculateTotal } = require("../src/app");
const test = require("node:test");
const assert = require("node:assert/strict");
const { app, calculateTotal } = require("../src/app");

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
//test ajoutés
test("GET /tasks returns the task list", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    const response = await fetch(`http://localhost:${address.port}/tasks`);

    assert.equal(response.status, 200);

    const tasks = await response.json();

    assert.ok(Array.isArray(tasks));
    assert.equal(tasks.length, 2);
    assert.equal(tasks[0].id, 1);
    assert.equal(tasks[0].title, "Configurer le projet");
    assert.equal(tasks[1].id, 2);
    assert.equal(tasks[1].title, "Ajouter GET /tasks");
  } finally {
    server.close();
  }
});

