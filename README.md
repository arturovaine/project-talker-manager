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


1 - Criação do endpoint GET `/talker`

````
router.get('/talker', async (req, res) => {
  const talkers = await fs.promises.readFile(path, 'utf-8');

  return (res.status(200).json(JSON.parse(talkers)));
});
````
2 - Criação do endpoint GET `/talker/:id`

````
router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.promises.readFile(path, 'utf-8');
  
  const { id } = req.params;

  const talkerById = JSON.parse(talkers).find((talker) => talker.id === parseInt(id, 10));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerById);
});
````
3 - Criação do endpoint POST `/login`

````
router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }),
);
````

4 - Criação do endpoint POST `/talker`
````
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
````

5 - Criação do endpoint PUT `/talker/:id`

````
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
````
6 - Criação do endpoint DELETE `/talker/:id`

````
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
````

