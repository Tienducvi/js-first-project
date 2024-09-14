import express, { Request, Response} from 'express';
import { filterImageFromURL } from './util';
import path from 'path';
import fs from 'fs';

export const router = express.Router();

router.get('/filteredimage', async (req: Request, res: Response) : Promise<void> => {
  let filename = req.query.filename as string;
  let width = req.query.width as string;
  let height = req.query.height as string;
  const resizedFilePath = path.join(__dirname, `../images/${filename}-${width}-${height}.jpg`);
  console.log(filename);
  // No image url param
  if (!filename) {
    res.status(404).send('404 Not Found!');
    return;
  }
  //image url param is empty
  if (filename.length == 0) {
    res.status(400).send('Bad Request!');
    return;
  }
  if (!width || !height) {
    res.status(400).send('Missing width or height!');
    return;
  }
  if (!parseInt(width)) {
    res.status(400).send('Invalid width!');
    return;
  }
  if (!parseInt(height)) {
    res.status(400).send('Invalid height!');
    return;
  }
  // check if file is cached
  if (fs.existsSync(resizedFilePath)) {
    // Serve the cached image
    res.sendFile(resizedFilePath);
    return;
  }
  //send the resulting file in the response
  filterImageFromURL(filename, parseInt(width), parseInt(height))
    .then((resolve) => {
      res.status(200).sendFile(resolve as string);
      return;
    })
    //Error in function
    .catch((error) => {
      res.status(500).send('Internal Server Error: ' + error);
      return;
    });
});

export default router;
