const TokenNF = 'Token não encontrado';
const TokenInv = 'Token inválido';

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: TokenNF });
  if (authorization.length < 16) return res.status(401).json({ message: TokenInv });
  
  next();
};

module.exports = validToken;