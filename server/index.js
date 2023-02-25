require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const router = require('./routes.js');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', router);

app.get(`/${process.env.LOADER_IO}`, (req, res) => (
  res.status(200).send(process.env.LOADER_IO)
));

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server listening at PORT:${process.env.PORT}`);
  }
});
