const randomToken = () => {
  const token = Math.random().toString(36).substring(2, 10) 
  + Math.random().toString(36).substring(2, 10);
  return token;
};

const isValid = /\S+@\S+\.\S+/;
const SIZE_PASS = 6;

const validaEmail = (email) => {
  const validEmail = isValid.test(email);
  return validEmail;
};

const emailInvalid = 'O "email" deve ter o formato "email@email.com"';
const passObrigatorio = 'O campo "password" é obrigatório';
const minPass = 'O "password" deve ter pelo menos 6 caracteres';
const emailObrigatorio = 'O campo "email" é obrigatório';

const loginAuth = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: emailObrigatorio });
  if (!validaEmail(email)) return res.status(400).json({ message: emailInvalid });
  if (!password) return res.status(400).json({ message: passObrigatorio });
  if (password.length < SIZE_PASS) return res.status(400).json({ message: minPass });

  next();
};

module.exports = { loginAuth, randomToken };