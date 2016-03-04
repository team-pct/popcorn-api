const mongoose = require("mongoose");

module.exports = mongoose.model("Show", {
  _id: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  imdb_id: String,
  tvdb_id: String,
  title: String,
  slug: String,
  synopsis: String,
  year: String,
  images: {},
  runtime: String,
  rating: {},
  country: String,
  network: String,
  status: String,
  air_day: String,
  air_time: String,
  num_seasons: Number,
  genres: [],
  last_updated: Number,
  episodes: []
});
