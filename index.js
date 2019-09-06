const csv = require('csv-parser');
const fs = require('fs');

const badWordsRegExp = require('./badWordsRegex');

const csvFile = process.argv[2];

if (!csvFile) {
  throw new Error("CSV file not specified. Usage: npm start example.csv");
}

console.log(`Scanning ${csvFile} for profane words...\n`);

let badWordsCount = 0;

fs.createReadStream(csvFile)
  .pipe(csv())
  .on('data', row => {
    for (let [key, value] of Object.entries(row)) {
      const found = value.match(badWordsRegExp);

      if (found) {
        console.log(`Line ${row.Line}: found "${found}" in column "${key}".`);
        badWordsCount++;
      }
    }
  })
  .on('end', () => {
    console.log(`\nDone. Found ${badWordsCount} profane words.`);
  });
