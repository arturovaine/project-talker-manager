/* eslint-disable quotes */
// 3 - Crie o endpoint POST /login -> login.test.js

const isValidEmail = (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    
    if (!email.includes('@') || !email.includes('.com')) {
        return (res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        }));
    }

    next();
};

const isValidPassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
    return (res.status(400).json({ message: 'O campo "password" é obrigatório' }));
    }

    if (password.length < 6) {
    return (res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }));
    }
        
    next();
};

// 4 - Crie o endpoint POST /talker -> createTalker.test.js

const isValidToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req);

    if (!token) { return (res.status(401).json({ message: 'Token não encontrado' })); }

    if (token.length !== 16) { return (res.status(401).json({ message: 'Token inválido' })); }

    next();
};

const isValidNameFilled = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return (res.status(400).json({ message: 'O campo "name" é obrigatório' }));
    }

    next();
};

const isValidNameLength = (req, res, next) => {
    const { name } = req.body;

    if (name && name.length < 3) {
        return (res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }));
    }

    next();
};

const isValidAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) { return (res.status(400).json({ message: 'O campo "age" é obrigatório' })); }

    next();
};

const isValidAge18yo = (req, res, next) => {
    const { age } = req.body;

    if (age < 18) {
        return (res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
    }));
    }

    next();
};

const isTalkDateFilled = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;

    if (!watchedAt || watchedAt === undefined) {
        return (res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        }));
    }

    next();
};

const isValidTalkDate = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if (!watchedAt.match(regexDate)) {
        return (res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        }));
    }

    next();
};

const isTalkRateFilled = (req, res, next) => {
    const { talk: { rate } } = req.body;

    if (!rate || rate === undefined) {
        return (res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        }));
    }

    next();
};

const isValidTalkRate = (req, res, next) => {
    const { talk: { rate } } = req.body;

    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return (res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }));
    }

    next();
};
/*
const isValidTalk = (req, res, next) => {
    const { talk: { watchedAt, rate } } = req.body;

    if (talk.length === 0 || !rate) {
        return (res.status(400).json({
          message: "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios",
        }));
    }

    next();
};
*/

const isValidTalkFilled = (req, res, next) => {
    const { talk } = req.body;

    if (!talk || talk.length === 0 || talk === undefined) {
        return (res.status(400).json({
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        }));
    }

    next();
};

const authMiddleware = (req, res, next) => {
    const { headers } = req;
    console.log('Headers:');
    console.log(headers);

    if (headers.authorization) {
        next();
    } else {
        res.status(401).json({ message: 'Token não encontrado' });
        next();
    }
};

module.exports = {
    isValidEmail,
    isValidPassword,
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
    authMiddleware,
};
