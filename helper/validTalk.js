const talkOBJ = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const rateMSG = 'O campo "rate" deve ser um inteiro de 1 à 5';

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: talkOBJ });
  const { watchedAt, rate } = talk;
  if (rate === 0) return res.status(400).json({ message: rateMSG });
  if (!watchedAt || !rate) return res.status(400).json({ message: talkOBJ });
  next();
};

module.exports = validTalk;