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
    const row = {
      id: Number(chunk.id),
      product_id: Number(chunk.product_id),
      body: chunk.body,
      date_written: chunk.date_written,
      asker_name: chunk.asker_name,
      asker_email: chunk.asker_email,
      reported: Number(chunk.reported),
      helpful: Number(chunk.helpful)
    };

    this.push(csvStringifier.stringifyRecords([row]));

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
