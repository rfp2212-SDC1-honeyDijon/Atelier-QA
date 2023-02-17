const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'question_id', title: 'question_id' },
    { id: 'body', title: 'body' },
    { id: 'date_written', title: 'date_written' },
    { id: 'answerer_name', title: 'answerer_name' },
    { id: 'answerer_email', title: 'answerer_email' },
    { id: 'reported', title: 'reported' },
    { id: 'helpful', title: 'helpful' }
  ]
});

let readStream = fs.createReadStream('./raw_data/answers.csv');
let writeStream = fs.createWriteStream('./transformed_data/cleanAnswers.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const row = {
      id: Number(chunk.id),
      question_id: Number(chunk.question_id),
      body: chunk.body,
      date_written: chunk.date_written,
      answerer_name: chunk.answerer_name,
      answerer_email: chunk.answerer_email,
      reported: Number(chunk.reported),
      helpful: Number(chunk.helpful)
    }

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
  .on('finish', () => { console.log('finished transforming answers'); });
