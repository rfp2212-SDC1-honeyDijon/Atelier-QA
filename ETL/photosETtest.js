const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'answer_id', title: 'answer_id' },
    { id: 'url', title: 'url' }
  ]
});

let readStream = fs.createReadStream('./raw_test/answer_photos_test.csv');
let writeStream = fs.createWriteStream('./transformed_test/cleanAnswersPhotosTest.csv');

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
    let onlyAnswerIdNumbers = chunk.answer_id.replace(/\D/g, '');
    chunk.id = onlyIdNumbers;
    chunk.answer_id = onlyAnswerIdNumbers;

    chunk = csvStringifier.stringifyRecords([chunk]);
    console.log('chunk', chunk);
    let commaCount = 0;
    let quoteInsertIndex;

    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] === ',') {
        commaCount++;
        if (commaCount === 2) {
          quoteInsertIndex = i + 1;
        }
      }
    }

    let text = chunk.slice(0, quoteInsertIndex) + '"' + chunk.slice(quoteInsertIndex).trim();
    console.log('text', text);
    let result = text.concat(`"\n`);
    console.log('result', result);

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
  .on('finish', () => { console.log('finished transforming photos'); });


// chunk 1,5,https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80

// text 1,5,"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80

// result 1,5,"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"