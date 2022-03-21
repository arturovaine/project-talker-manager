const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const {
    isValidEmail,
    isValidPassword,
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

module.exports = router;
