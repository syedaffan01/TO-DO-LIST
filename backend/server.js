const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = require("./users.json");

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }
  users[username] = { password, tasks: [] };
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
  res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ message: "Login successful", username });
});

app.get("/tasks/:username", (req, res) => {
  const user = users[req.params.username];
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.tasks);
});

app.post("/tasks/:username", (req, res) => {
  const { category, task } = req.body;
  const user = users[req.params.username];
  if (!user) return res.status(404).json({ message: "User not found" });

  user.tasks.push({ category, task });
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
  res.json({ message: "Task added" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
