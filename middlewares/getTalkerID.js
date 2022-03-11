const readFile = require('../helper/readFile');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  
  const talkerFile = await readFile();
  
  const talkerID = talkerFile.find((talker) => talker.id === Number(id));
  
  if (!talkerID) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerID);
  next();
};