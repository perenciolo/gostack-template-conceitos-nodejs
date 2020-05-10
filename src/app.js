const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repo = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const repo = repositories.find((item) => item.id === id);
  if (!repo) {
    return response.status(400).send();
  }
  repo.title = title;
  repo.url = url;
  repo.techs = techs;
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repo = repositories.filter((item) => item.id === id);
  if (!repo.length) {
    return response.status(400).send();
  }
  const idx = repositories.indexOf(repo);
  repositories.splice(idx, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  let newRepo;
  repositories.forEach((repo) => {
    if (repo.id === id) {
      repo.likes += 1;
      newRepo = repo;
      return;
    }
  });
  if (!newRepo) {
    return response.status(400).send();
  }
  return response.json(newRepo);
});

module.exports = app;
