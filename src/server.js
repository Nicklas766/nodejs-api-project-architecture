import express from 'express';
import bodyParser from 'body-parser';
import artistRouter from './routes/artistRoutes';
import db from './common/db/db';
import config from './config';

db.connect(config.mongoUri);

const app = express();

app.use(bodyParser.json());
app.use(artistRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});
