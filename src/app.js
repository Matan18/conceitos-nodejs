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
  const { url, title,techs }= request.body;
  const newRepository = {
    id: uuid(),
    url,
    title,
    techs,
    likes:0
  };
  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id }=request.params;
  const {url, title, techs}=request.body;
  let repositoryIndex;
  const repository = repositories.find((project, index)=>{
    if(project.id=== id){
    repositoryIndex=index 
    return true}
    return false
  })
  if(!repository){
    return response.status(400).send();
  }

  const newRepository = {
    id: id,
    url, 
    title,
    techs,
    likes: repository.likes
  }
  repositories[repositoryIndex]= newRepository
  
  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id }= request.params;
  const repositoryIndex = repositories.findIndex(project => project.id === id)
  if(repositoryIndex<0){
    return response.status(400).json({error: "Project not found"})
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id }= request.params;
  const repositoryIndex = repositories.findIndex(project => project.id === id)
  if(repositoryIndex<0){
    return response.status(400).send({error: "Project not found"})
  }
  repositories[repositoryIndex].likes ++;

  return response.json({likes: repositories[repositoryIndex].likes})
});

module.exports = app;
