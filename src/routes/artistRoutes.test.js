import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import artistRouter from './artistRoutes';

const app = express();
app.use(bodyParser.json());
app.use(artistRouter);

describe('POST /artists/new', () => {
  it('should return 200', async () => {
    const res = await request(app)
      .post('/artists/new')
      .set('Accept', 'application/json')
      .send({ name: 'John' });

    expect(res.status).toBe(200);
  });

  it('should return 400 code - because name is missing', async () => {
    const res = await request(app)
      .post('/artists/new')
      .set('Accept', 'application/json')
      .send({ name: undefined, age: '40' });

    expect(res.status).toBe(400);
  });
});
