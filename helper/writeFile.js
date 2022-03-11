const fs = require('fs').promises;

const writeFile = async (talkerList) => {
  await fs.writeFile('./talker.json', JSON.stringify(talkerList, null, 2));
};

module.exports = writeFile;