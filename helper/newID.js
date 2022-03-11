const fs = require('fs').promises;
const path = require('path');

const newID = async () => {
  const TALKER = await fs
    .readFile(path.resolve(__dirname, '..', 'talker.json'))
    .then(JSON.parse);
    // peguei esse código com o Rogério.
  const novoID = Math.max(...TALKER.map((maxID) => maxID.id)) + 1;
  return novoID;
};

module.exports = newID;