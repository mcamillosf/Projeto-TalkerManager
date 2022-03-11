const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res, next) => {
  const TALKER = await fs
    .readFile(path.resolve(__dirname, '..', 'talker.json'))
    .then(JSON.parse);

  res.status(200).json(TALKER);

  next();
};