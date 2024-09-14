import app from '../index';
import fs from 'fs';
import path from 'path';
import { filterImageFromURL } from '../util';

const supertest = require('supertest');
const request = supertest(app);

describe('To test Image Resize Parameters width height parameter', () => {
  it('It should return 400 if image width and height parameter are not presented', async (): Promise<void> => {
    const response = await request.get('/filteredimage?filename=santamonica');
    expect(response.status).toBe(400);
  });
  it('It should return 400 if image parameters height or width are not a number', async (): Promise<void> => {
    const response = await request.get(
      '/filteredimage?filename=santamonica&width=a&height=b',
    );
    expect(response.status).toBe(400);
  });
  it('It should return true if image is cached successfully', async (): Promise<void> => {
    const resizedFilePath = path.join(__dirname, `../images/santamonica-400-400.jpg`);
    
    // Ensure the file does not exist before the function call
    if (fs.existsSync(resizedFilePath)) {
      fs.unlinkSync(resizedFilePath);
    }
    // Call the function that resizes the image and generates the file
    filterImageFromURL('santamonica',200,200).then((resolve) => {
      expect(fs.existsSync(resizedFilePath)).toBeTrue();
      return true      
    })
    //Error in function
    .catch((error) => {
      expect(fs.existsSync(resizedFilePath)).toBeTrue();
      return false
    });
    // Check if the file exists after the function call 
  });
});
