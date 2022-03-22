const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidNameFilled,
  isValidNameLength,
  isValidAge,
  isValidTalkDate,
  isValidTalkRate,
  isValidTalkFilled,
  authMiddleware,
} = require('../middlewares/validations');

// 1 - Crie o endpoint GET /talker

router.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');

  return (res.status(200).json(JSON.parse(talkers)));
});

// 2 - Crie o endpoint GET /talker/:id

router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  
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

router.post(
  '/talker',
  authMiddleware,
  isValidToken,
  isValidNameFilled,
  isValidNameLength,
  isValidAge,
  isValidTalkDate,
  isValidTalkRate,
  isValidTalkFilled,
  (_req, res) => {
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
  },
);

module.exports = router;
