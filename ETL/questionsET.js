const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'body', title: 'body' },
    { id: 'date_written', title: 'date_written' },
    { id: 'asker_name', title: 'asker_name' },
    { id: 'asker_email', title: 'asker_email' },
    { id: 'reported', title: 'reported' },
    { id: 'helpful', title: 'helpful' }
  ]
});

let readStream = fs.createReadStream('./raw_data/questions.csv');
let writeStream = fs.createWriteStream('./transformed_data/cleanQuestions.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }

    let onlyIdNumbers = chunk.id.replace(/\D/g, '');
    let onlyProdIdNumbers = chunk.product_id.replace(/\D/g, '');
    let cutBody = chunk.body.trim().slice(0, 1000);
    let onlyDateNumbers = chunk.date_written.replace(/\D/g, '');
    let cutName = chunk.asker_name.trim().slice(0, 60);
    let onlyHelpfulNumbers = chunk.helpful.replace(/\D/g, '');

    chunk.id = onlyIdNumbers;
    chunk.product_id = onlyProdIdNumbers;
    chunk.body = cutBody;
    chunk.date_written = onlyDateNumbers;
    chunk.asker_name = cutName;
    chunk.helpful = onlyHelpfulNumbers;

    chunk = csvStringifier.stringifyRecords([chunk]);

    chunk = chunk.split(',');

    chunk[2] = `"${chunk[2]}"`
    chunk[4] = `"${chunk[4]}"`
    chunk[5] = `"${chunk[5]}"`

    let result = chunk.join(',').concat('\n');

    this.push(result);

    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => { console.log('finished transforming questions'); });
