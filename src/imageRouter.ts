import express from 'express';
import { filterImageFromURL } from './util';

export const router = express.Router();

router.get('/filteredimage', async (req, res) => {
  let filename = req.query.filename as string;
  let width = req.query.width as string;
  let height = req.query.height as string;
  console.log(filename);
  // No image url param
  if (!filename) {
    return res.status(404).send('404 Not Found!');
  }
  //image url param is empty
  if (filename.length == 0) {
    return res.status(400).send('Bad Request!');
  }
  if (!width || !height) {
    return res.status(400).send('Missing width or height!');
  }
  if (!parseInt(width)) {
    return res.status(400).send('Invalid width!');
  }
  if (!parseInt(height)) {
    return res.status(400).send('Invalid height!');
  }
  //send the resulting file in the response
  filterImageFromURL(filename, parseInt(width), parseInt(height))
    .then((resolve) => {
      return res.status(200).sendFile(resolve as string);
    })
    //Error in function
    .catch((error) => {
      return res.status(500).send('Internal Server Error: ' + error);
    });
});

export default router;
