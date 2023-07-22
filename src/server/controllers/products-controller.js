const parseCSV = require('../utils/parse-csv');

const fileName = 'src/mocks/products.csv';

const getProducts = async (req, res, next) => {
  try {
    const data = await parseCSV(fileName);

    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
