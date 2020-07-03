const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  let likes = 0;
  const item = {id:uuid(), title, url, techs, likes };

  repositories.push(item);

  return response.status(201).json(item);


});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;
  const itemIndex = repositories.findIndex(item => item.id === id );
  
  if (itemIndex < 0 ){
    return response.status(400).json({ error : 'repositorie not found'});
  }

  let { likes } = repositories.find(item => item.id === id );
  
  const item = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[itemIndex] = item;

  return response.status(200).json(item);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const itemIndex = repositories.findIndex(item => item.id === id );
 
  if (itemIndex < 0 ){
    return response.status(400).json({ error : 'repositorie not found'});
  }

  repositories.splice(itemIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  
  const item = repositories.find(item => item.id === id );
  
  if (!item){
    return response.status(400).json({ error : 'repositorie not found'});
  }

  item.likes = item.likes + 1;

  response.status(200).json(item);
});

module.exports = app;
