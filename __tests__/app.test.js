const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Barbie = require('../lib/models/Barbie.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a barbie', async () => {
    const res = await request(app).post('/api/v1/barbies').send({
      name: 'Barbie2',
      skinColor: 'tan',
      hairColor: 'blonde',
      eyeColor: 'green',
      outfit: 'jumpsuit',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Barbie2',
      skinColor: 'tan',
      hairColor: 'blonde',
      eyeColor: 'green',
      outfit: 'jumpsuit',
    });
  });

  it('should get a barbie by id', async () => {
    const barbie = await Barbie.insert({
      name: 'Barbie3',
      skinColor: 'porcelain',
      hairColor: 'blonde',
      eyeColor: 'hazel',
      outfit: 'ballerina',
    });
    const res = await request(app).get('/api/v1/barbies/1');
    expect(res.body).toEqual(barbie);
  });

  it('should list all of the barbies', async () => {
    const barbie4 = await Barbie.insert({
      name: 'Barbie4',
      skinColor: 'Espresso',
      hairColor: 'black',
      eyeColor: 'brown',
      outfit: 'engineer',
    });
    const barbie5 = await Barbie.insert({
      name: 'Barbie4',
      skinColor: 'Sand',
      hairColor: 'red',
      eyeColor: 'green',
      outfit: 'dress',
    });
    const res = await request(app).get('/api/v1/barbies');
    expect(res.body).toEqual([barbie4, barbie5]);
  });

  it('should update a barbie by id', async () => {
    const barbie = await Barbie.insert({
      name: 'Barbie',
      skinColor: 'brown',
      hairColor: 'black',
      eyeColor: 'brown',
      outfit: 'dress',
    });
    const res = await request(app)
      .patch('/api/v1/barbies/1')
      .send({ hairColor: 'purple' });

    expect(res.body).toEqual({
      ...barbie,
      hairColor: 'purple',
    });
  });
  it('should delete a barbie by id', async () => {
    const noBarbie = await Barbie.insert({
      name: 'Ken',
      skinColor: 'golden',
      hairColor: 'blonde',
      eyeColor: 'blue',
      outfit: 'suit',
    });
    const res = await request(app).delete(`/api/v1/barbies/${noBarbie.id}`);
    expect(res.body).toEqual(noBarbie);
    expect(await Barbie.getById(noBarbie.id)).toBeNull();
  });
});
