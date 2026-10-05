const express = require("express");
 
const app = express();

const port = process.env.PORT || 3000;
 
app.use(express.json());
 
const initialTasks = [

  { id: 1, title: "First task", completed: false },

  { id: 2, title: "Second task", completed: false }

];
 
const tasks = [];
 
function resetTasks() {

  tasks.length = 0;

  initialTasks.forEach((task) => tasks.push({ ...task }));

}
 
resetTasks();
 
function calculateTotal(items) {

  return items.reduce(

    (total, item) => total + item.price * item.quantity,

    0

  );

}
 
app.get("/", (_req, res) => {

  res.json({

    service: "devops-platform-challenge",

    status: "ok"

  });

});
 
app.get("/health", (_req, res) => {

  res.json({ status: "healthy" });

});
 
app.get("/total", (_req, res) => {

  const items = [

    { price: 10, quantity: 2 },

    { price: 5, quantity: 3 }

  ];
 
  res.json({ total: calculateTotal(items) });

});
 
app.post("/tasks", (req, res) => {

  const { title } = req.body;
 
  if (typeof title !== "string" || title.trim() === "") {

    return res.status(400).json({

      error: "Title is required"

    });

  }
 
  const newTask = {

    id:

      tasks.length > 0

        ? Math.max(...tasks.map((task) => task.id)) + 1

        : 1,

    title: title.trim(),

    completed: false

  };
 
  tasks.push(newTask);
 
  return res.status(201).json(newTask);

});
 
app.patch("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);
 
  if (!task) {

    return res.status(404).json({

      error: "Task not found"

    });

  }
 
  if (typeof req.body.completed !== "boolean") {

    return res.status(400).json({

      error: "Invalid completed value"

    });

  }
 
  task.completed = req.body.completed;
 
  return res.status(200).json(task);

});
 
app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = tasks.findIndex((task) => task.id === id);
 
  if (index === -1) {

    return res.status(404).json({

      error: "Task not found"

    });

  }
 
  tasks.splice(index, 1);
 
  return res.status(204).send();

});
 
if (require.main === module) {

  app.listen(port, () => {

    console.log(`Application listening on port ${port}`);

  });

}
 
module.exports = { app, calculateTotal, tasks, resetTasks };
 