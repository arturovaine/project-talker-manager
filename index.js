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

const fs = require('fs').promises;

// const readData = () => fs.readFileSync(
// ler arquivo
// converter para json 
// parse

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');

  return (res.status(200).json(JSON.parse(talkers)));
});

// 2 - Crie o endpoint GET /talker/:id
// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1,
// com o seguinte corpo: ;...Henrique

// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 com o seguinte corpo:
// { "message": "Pessoa palestrante não encontrada" }

app.get('/talker/:id', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  
  const { id } = req.params;

  const talkerById = JSON.parse(talkers).find((talker) => talker.id === parseInt(id, 10));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerById);
});
