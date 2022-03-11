const fs = require('fs').promises;

const readFile = async () => {
  const talkerFile = await fs
  .readFile('./talker.json')
  .then(JSON.parse);

  return talkerFile;
};

module.exports = readFile;