const validDate = (date) => {
  const valiDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const data = valiDate.test(date);
  return data;
};

const watched = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const rateMSG = 'O campo "rate" deve ser um inteiro de 1 à 5';

const validTalkInfo = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (!validDate(watchedAt)) return res.status(400).json({ message: watched });
  if (rate < 1 || rate > 5) return res.status(400).json({ message: rateMSG });
  next();
};

module.exports = validTalkInfo;