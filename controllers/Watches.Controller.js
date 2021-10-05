'use strict';
const axios = require('axios');
require('dotenv').config();
const { Watches, WatchesModel } = require('../models/Watches.Model');

const getWatches = async (req, res) => {
  let watchesData = await axios.get(
    'https://watches-world.herokuapp.com/watches-list/'
  );
  res.json(watchesData.data);
};

const favouriteWatch = async (req, res) => {
  const { title, description, toUSD, image } = req.body;
  const newWatch = new WatchesModel({ title, description, toUSD, image });
  newWatch
    .save()
    .then(() => res.json('Watch added to wish-list'))
    .catch((err) => res.status(400).json('Error! ' + err));
};

const getFavWatch = async (req, res) => {
  WatchesModel.find({ email: req.query.email }, (err, favData) => {
    if (err) res.json('Error! ' + err);
    else res.json(favData);
  });
};

const deleteWatch = async (req, res) => {
  WatchesModel.deleteOne({ _id: req.params.id }, (err, deleteData) => {
    if (err) res.status(400).json('Error! ' + err);
    res.json(deleteData);
  });
};

const updateWatch = async (req, res) => {
  const { title, description, toUSD, image } = req.body;

  WatchesModel.findByIdAndUpdate(
    { _id: req.params.id },
    { title, description, toUSD, image },
    { new: true },
    (err, UpdateData) => {
      if (err) res.status(400).json('Error! ' + err);
      else res.json(UpdateData);
    }
  );
};

module.exports = {
  getWatches,
  favouriteWatch,
  getFavWatch,
  deleteWatch,
  updateWatch,
};
