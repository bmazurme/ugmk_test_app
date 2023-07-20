const fs = require('fs');
const csvParse = require('csv-parse');

const parseCSV = (filename) => new Promise((resolve, reject) => {
  fs.readFile(filename, (err, fileData) => {
    if (err) {
      reject(err);

      return;
    }
    csvParse.parse(fileData, { bom: true, columns: true, trim: true }, (error, rows) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(rows);
    });
  });
});

module.exports = parseCSV;
