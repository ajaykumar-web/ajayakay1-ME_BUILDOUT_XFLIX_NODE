const mongoose = require("mongoose");
const validator = require("validator");
const { contentRating, genres } = require("../utils/values");

const videoRegex = "^(https?://)?((www.)?youtube.com|youtu.be)/.+$";

const videoSchema = mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    validation(value) {
      if (!genres.includes(value)) {
        throw new Error("Invalid genre.");
      }
    },
  },
  contentRating: {
    type: String,
    required: true,
    trim: true,
    validation(value) {
      if (!contentRating.includes(value)) {
        throw new Error("Invalid content rating.");
      }
    },
  },
  releaseDate: {
    type: Date,
    required: true,
    default: Date.now(),
    trim: true,
  },
  previewImage: {
    type: String,
    required: true,
    default: "https://i.ytimg.com/vi/CEg30z7cO-s/mqdefault.jpg",
    trim: true,
  },
  votes: {
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = {
  Video,
};
