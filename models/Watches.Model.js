'use strict';

const mongoose = require('mongoose');

class Watches {
  constructor(id, title, description, toUSD, image) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.toUSD = toUSD;
    this.image = image;
  }
}

const watch = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true },
  description: { type: String, required: true },
  toUSD: { type: String, required: true },
  image: { type: String, required: true },
});

const WatchesModel = new mongoose.model('Watches', watch);

module.exports = { Watches, WatchesModel };
