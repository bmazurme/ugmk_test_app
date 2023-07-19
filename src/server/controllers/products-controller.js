const parseCSV = require('../utils/parse-csv');

const fileName = 'src/mocks/products.csv';

const getProducts = async (req, res, next) => {
  try {
    const products = await parseCSV(fileName);

    res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
