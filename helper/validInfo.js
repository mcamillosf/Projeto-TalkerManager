const SIZE_NAME = 3;
const idade = 18;
const nameRQT = 'O campo "name" é obrigatório';
const nameLGT = 'O "name" deve ter pelo menos 3 caracteres';
const ageMinimum = 'A pessoa palestrante deve ser maior de idade';
const ageRQT = 'O campo "age" é obrigatório';

const validInfo = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: nameRQT });
  if (name.length < SIZE_NAME) return res.status(400).json({ message: nameLGT });
  if (!age) return res.status(400).json({ message: ageRQT });
  if (age < idade) return res.status(400).json({ message: ageMinimum });
  next();
};

module.exports = validInfo;