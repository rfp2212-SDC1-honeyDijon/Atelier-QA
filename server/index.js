require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const db = require('./database/db.js');

const app = express();

const router = require('./routes.js');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server listening at http://${process.env.DB_HOST}:${process.env.PORT}`);
  }
});
