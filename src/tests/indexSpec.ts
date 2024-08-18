import app from '../index';

const supertest = require('supertest');
const request = supertest(app);

describe('To test Image Resize Parameters width height parameter', () => {
  it('It should return 400 if image width and height parameter are not presented', async (): Promise<void> => {
    const response = await request.get('/filteredimage?filename=fjord');
    expect(response.status).toBe(400);
  });
  it('It should return 400 if image parameters height or width are not a number', async (): Promise<void> => {
    const response = await request.get(
      '/filteredimage?filename=fjord&width=a&height=b',
    );
    expect(response.status).toBe(400);
  });
});
