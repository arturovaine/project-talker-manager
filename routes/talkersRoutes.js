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

// 1 - Crie o endpoint GET /talker

router.get('/talker', async (req, res) => {
  const talkers = await fs.promises.readFile('./talker.json', 'utf-8');

  return (res.status(200).json(JSON.parse(talkers)));
});

// 2 - Crie o endpoint GET /talker/:id

router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.promises.readFile('./talker.json', 'utf-8');
  
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
    let talkers = fs.readFileSync('./talker.json', 'utf-8');
    talkers = JSON.parse(talkers);

    const { name, age, talk: { watchedAt, rate } } = req.body;

    talkers.push({ name, age, id: talkers.length + 1, talk: { watchedAt, rate } });
  
    const updatedTalkers = fs.writeFileSync('./talker.json', JSON.stringify(talkers), 'utf-8');
    console.log(typeof updatedTalkers);
    res.status(201).json({ name, age, id: talkers.length, talk: { watchedAt, rate } });  
  },
);

/*
const talkers = fs.readFile('./talker.json', 'utf8');

    talkers.push({
      id: 1,
      name: 'Danielle Santos',
      age: 56,
      talk: {
        watchedAt: '22/10/2019',
        rate: 5,
      },
    });

    return (res.status(201).json(JSON.parse(talkers)));
*/

/*
const talkers = fs.promises.readFile('./talker.json', 'utf-8');

    const { name, age, id, talk: { watchedAt, rate } } = req.body;

    talkers.push({ name, age, id, talk: { watchedAt, rate } });
  
    const updatedTalkers = fs.writeFile('./talker.json', talkers, 'utf-8');

    res.status(201).json(updatedTalkers);
*/

// 5 - Crie o endpoint PUT /talker/:id
/*
router.put(
  '/talker/:id',
  isValidToken,
  isValidNameFilled,
  isValidNameLength,
  isValidAge,
  isValidAge18yo,
  isTalkDateFilled,
  isValidTalkDate,
  isTalkRateFilled,
  isValidTalkRate,
  isValidTalkFilled,
  (req, res) => {
    const { id } = req.params;
    const talkers = fs.readFile('./talker.json', 'utf-8');
    const chosenTalker = talkers.find((t) => t.id === id);
    
  },
);
*/

// 6 - Crie o endpoint DELETE /talker/:id
/*
router.delete(
  '/talker/:id',
  (req, res) => {
    const { id } = req.params;
    const talkers = fs.promises.readFile('./talker.json', 'utf-8');
    const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id));

    res.status(204).end();
  },
);
*/

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
module.exports = router;
