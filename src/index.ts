import express from 'express';
import bodyParser from 'body-parser';
import { router as imageRouter } from './imageRouter';
import { filterImageFromURL } from './util';

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// Displays a simple message to the user
app.get('/', async (req, res) => {
  //res.send("try GET /filteredimage?image_url={{}}")
  res.status(200).send('This is udacity project');
});

//Resize image
app.use(imageRouter);

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});

export default app;
