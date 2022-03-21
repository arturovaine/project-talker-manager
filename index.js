const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// 1 - Crie o endpoint GET /talker
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas, devendo retornar o status 200.
// Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.

const fs = require('fs');

const talkersFile = fs.readFileSync('./talker.json', 'utf-8');
app.get('/talker', (req, res) => {
  console.log(talkersFile);
  const empty = [];
  if (talkersFile.length !== 0) { return (res.status(200).send(talkersFile)); }
  return res.status(200).send(empty);
});
