import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});