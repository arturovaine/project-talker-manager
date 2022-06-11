# Talker Manager 

# Sumário


- [Talker Manager](#talker-manager)
- [Sumário](#sumário)
- [Skills / funcionalidades:](#skills--funcionalidades)
  - [- Criação de rotas e aplicação de middlewares.](#--criação-de-rotas-e-aplicação-de-middlewares)
    - [1 - Criação do endpoint GET `/talker`](#1---criação-do-endpoint-get-talker)
    - [2 - Criação do endpoint GET `/talker/:id`](#2---criação-do-endpoint-get-talkerid)
    - [3 - Criação do endpoint POST `/login`](#3---criação-do-endpoint-post-login)
    - [4 - Criação do endpoint POST `/talker`](#4---criação-do-endpoint-post-talker)
    - [5 - Criação do endpoint PUT `/talker/:id`](#5---criação-do-endpoint-put-talkerid)
    - [6 - Criação do endpoint DELETE `/talker/:id`](#6---criação-do-endpoint-delete-talkerid)
    - [7 - Criação do endpoint GET `/talker/search?q=searchTerm`](#7---criação-do-endpoint-get-talkersearchqsearchterm)

---

# Skills / funcionalidades:

Habilidades utilizadas:

- Operações assíncronas utilizando callbacks;
- Operações assíncronas utilizando Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Criação e consumo de funções com Promises;
- Criação de API utilizando Node e Express;
- Criação de rotas e aplicação de middlewares.
---

### Estrutura de base do projeto

```
├───README.md 
├───index.js
├───package.json   
├───talker.json
│
├───middlewares
│   └─ validations.js 
│   
└───routes
    └─ talkerRoutes.js

```

### index.js

```JavaScript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Raíz
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const talkersRoutes = require('./routes/talkersRoutes');

app.use(talkersRoutes);
```


### 1 - Criação do endpoint GET `/talker`


Endpoint deve retornar um array com todas as pessoas palestrantes cadastradas.


```JavaScript
router.get('/talker', async (req, res) => {
  const talkers = await fs.promises.readFile(path, 'utf-8');

  return (res.status(200).json(JSON.parse(talkers)));
});
```

### 2 - Criação do endpoint GET `/talker/:id`


Endpoint deve retornar uma pessoa palestrante com base no id da rota. Deve retornar o status 200 ao fazer uma requisição `/talker/1`, por exemplo.


```JavaScript
router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.promises.readFile(path, 'utf-8');
  
  const { id } = req.params;

  const talkerById = JSON.parse(talkers).find((talker) => talker.id === parseInt(id, 10));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerById);
});
```

### 3 - Criação do endpoint POST `/login`

Endpoint retorna um token aleatório de 16 caracteres que será ser utilizado nas demais requisições.
Endpoint retorna um código de status 200 com o token gerado.

```JavaScript
router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }),
);
```

### 4 - Criação do endpoint POST `/talker`

Endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo.

```JavaScript
router.post(
  '/talker',
  isValidToken,
  isNameFilled,
  isValidNameLength,
  isValidAge,
  isValidAge18yo,
  isTalkDateFilled,
  isValidTalkDate,
  isTalkRateFilled,
  isValidTalkRate,
  isTalkFilled,
  (req, res) => {
    let talkers = fs.readFileSync(path, 'utf-8');
    talkers = JSON.parse(talkers);

    const { name, age, talk: { watchedAt, rate } } = req.body;

    talkers.push({ name, age, id: talkers.length + 1, talk: { watchedAt, rate } });
  
    fs.writeFileSync(path, JSON.stringify(talkers), 'utf-8'); // converte objeto JS para string JSON

    res.status(201).json({ name, age, id: talkers.length, talk: { watchedAt, rate } });  
  },
);
```

### 5 - Criação do endpoint PUT `/talker/:id`

Endpoint para editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.


```JavaScript
router.put(
  '/talker/:id',
  isValidToken,
  isNameFilled,
  isValidNameLength,
  isValidAge,
  isValidAge18yo,
  isTalkDateFilled,
  isValidTalkDate,
  isTalkRateFilled,
  isValidTalkRate,
  isTalkFilled,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;

    let talkers = fs.readFileSync(path, 'utf-8');
    talkers = JSON.parse(talkers);

    const conditionIndex = (talker) => parseInt(talker.id, 10) === parseInt(id, 10);
    const index = talkers.findIndex(conditionIndex);

    talkers[index].name = name;
    talkers[index].age = age;
    talkers[index].talk.watchedAt = watchedAt;
    talkers[index].talk.rate = rate;    

    fs.writeFileSync(path, JSON.stringify(talkers), 'utf-8'); // converte objeto JS para string JSON

    res.status(200).json(talkers[index]);
  },
);
```

### 6 - Criação do endpoint DELETE `/talker/:id`

Endpoint deleta uma pessoa palestrante com base no id da rota. Retorna status 204, sem conteúdo na resposta.
Requisição recebe token de autenticação nos headers, no campo authorization.

```JavaScript
router.delete(
  '/talker/:id',
  isValidToken,
  (req, res) => {
    const { id } = req.params;
    let talkers = fs.readFileSync(path, 'utf-8');
    talkers = JSON.parse(talkers);

    const conditionIndex = (talker) => parseInt(talker.id, 10) === parseInt(id, 10);
    const index = talkers.findIndex(conditionIndex);

    delete talkers[index];
    
    fs.writeFileSync(path, JSON.stringify(talkers), 'utf-8');

    res.status(204).end();
  },
);
```

### 7 - Criação do endpoint GET `/talker/search?q=searchTerm`

Endpoint retorna um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL.
Retorna status 200.

```JavaScript
router.get(
  '/talker/search',
  isValidToken,
  (req, res) => {
    const { searchTerm } = req.query;
    const talkers = fs.readFileSync('./talker.json', 'utf-8');

    const conditionIndex = (talker) => talker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const index = talkers.findIndex(conditionIndex);
    console.log(index);

    if (searchTerm) {
      return (res.status(200).json(JSON.parse(talkers)));
    }
    console.log('oi');
    res.status(200).send({ message: 'ok' });
  },
);
```
