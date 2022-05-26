const express = require('express');

const router = express.Router();

const fs = require('fs');

const {
  isValidEmail,
  isValidPassword,
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
} = require('../middlewares/validations');

const path = './talker.json';

// 1 - Crie o endpoint GET /talker

router.get('/talker', async (req, res) => {
  const talkers = await fs.promises.readFile(path, 'utf-8');

  return (res.status(200).json(JSON.parse(talkers)));
});

// 2 - Crie o endpoint GET /talker/:id

router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.promises.readFile(path, 'utf-8');
  
  const { id } = req.params;

  const talkerById = JSON.parse(talkers).find((talker) => talker.id === parseInt(id, 10));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerById);
});

// 3 - Crie o endpoint POST /login 

router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }),
);

// 4 - Crie o endpoint POST /talker
// O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;
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

// 5 - Crie o endpoint PUT /talker/:id

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

// 6 - Crie o endpoint DELETE /talker/:id

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

// 7 - Crie o endpoint GET /talker/search?q=searchTerm
/*
router.get(
  '/talker/search',
  isValidToken,
  (req, res) => {
    const { searchTerm } = req.query;
    const talkers = fs.promises.readFile('./talker.json', 'utf-8');
    if (searchTerm) {
      const talkerBySearchTerm = JSON.parse(talkers).find((talker) => {
        talker.name.toLowerCase().includes(searchTerm.toLowerCase()),
      });
      return talkerBySearchTerm;
    }
    res.status(200).json(JSON.parse(talkers));
  },
);
*/

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
module.exports = router;
