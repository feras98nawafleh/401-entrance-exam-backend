const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const mongoose = require('mongoose');
const {
  getWatches,
  favouriteWatch,
  getFavWatch,
  deleteWatch,
  updateWatch,
} = require('./controllers/Watches.Controller');

mongoose.connect(process.env.MONGO_URL, () => {
  console.log('Connected to Mongo Atlas');
});

server.get('/watches', getWatches);
server.post('/addFavourite', favouriteWatch);
server.get('/favourites', getFavWatch);
server.delete('/delete/:id', deleteWatch);
server.put('/update/:id', updateWatch);

server.listen(process.env.PORT, () => {
  console.log('server started listening on PORT 8000');
});
