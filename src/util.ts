import fs from 'fs';
import Jimp from 'jimp';
import path from 'path';
import { arrayBuffer } from 'stream/consumers';

export async function filterImageFromURL(
  filename: string,
  width: number,
  height: number,
) : Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = path.join(__dirname, `../images/${filename}.jpg`);
      const resizedFilePath = path.join(__dirname, `../images/${filename}-${width}-${height}.jpg`);
      let bufferFile = filePath;
      const photo = await Jimp.read(bufferFile);
      const outpath = resizedFilePath;
      await photo
        .resize(width, height) // resize
        .quality(100) // set JPEG quality
        .write(outpath, (img) => {
          console.log(outpath);
          resolve(outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default filterImageFromURL;