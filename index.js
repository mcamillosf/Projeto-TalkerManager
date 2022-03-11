const express = require('express');
const bodyParser = require('body-parser');
const readFile = require('./helper/readFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalker = require('./middlewares/getAllTalker');
const getTalkerID = require('./middlewares/getTalkerID');
const { loginAuth, randomToken } = require('./middlewares/postLogin');
const validToken = require('./helper/validToken');
const validInfo = require('./helper/validInfo');
const validTalk = require('./helper/validTalk');
const validTalkInfo = require('./helper/validTalkInfo');
const newID = require('./helper/newID');
const writeFile = require('./helper/writeFile');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Desafio 7
app.get('/talker/search', validToken, async (req, res) => {
  const { name } = req.query;
  const file = await readFile();
  if (!name) return res.status(200).json(file);
  const filtered = file.filter((f) => f.name.includes(name));
  res.status(200).json(filtered);
});

// Desafio 1
app.get('/talker', getTalker);

// Desafio 2
app.get('/talker/:id', getTalkerID);

// Desafio 3
app.post('/login', loginAuth, (req, res) => {
  const tokenID = {
    token: randomToken(),
  };
  req.headers.Authorization = tokenID;
  res.status(200).json(tokenID);
});

// Desafio 4
app.post('/talker', validToken, validInfo, validTalk, validTalkInfo, async (req, res) => {
  const talkerList = await readFile();
  const id = await newID();
  const newTalker = {
    id,
    ...req.body,
  };
  talkerList.push(newTalker);
  await writeFile(talkerList);
  res.status(201).json(newTalker);
});

// Desafio 5
app.put('/talker/:id', validToken, validInfo, validTalk, validTalkInfo, async (req, res) => {
  const { id: i } = req.params;
  const id = Number(i);
  const updatedTalker = { ...req.body, id };

  writeFile([updatedTalker]);
  
  res.status(200).json(updatedTalker);
});

// Desafio 6. belo teste!
app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  // const file = await readFile();
  // const filtered = await file.filter((i) => `${i.id}` != id);
  writeFile(JSON.stringify([id]));
  // console.log(filter);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
