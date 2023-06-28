const { Video } = require("../model/video.model");
const ObjectId = require('mongoose').Types.ObjectId;
const Values = require("../utils/values")
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

class videoSevice {
  getVideo = async (title, contentRating, genres, sortBy) => {
    const titleMatch = { title: { $regex: title, $options:'i' } };
    const getPossibleRatings = (contentRating) => {
      let contentRatings = [...Values.contentRating];
      if (contentRating === "All") {
        return contentRatings;
      }
      const contentRatingIndex = contentRatings.indexOf(contentRating);

      const possibleContentRatings = contentRatings.splice(contentRatingIndex, contentRating.length);
      console.log(possibleContentRatings);
      return possibleContentRatings;
    }
    const contentRatings = getPossibleRatings(contentRating);
    const contentRatingMatch = { contentRating: { $in: contentRatings } };
    let genresArray = Array.isArray(genres) ? genres : genres.split(',');
    let genreMatch = { genre: { $in: genresArray } };
    if (genres.includes("All")) {
      genreMatch = null;
    }
    const videoDoc = await Video.find({
      ...titleMatch,
      ...contentRatingMatch,
      ...genreMatch,

    });
    if (sortBy == "viewCount") {
      videoDoc.sort((p1, p2) => p1.viewCount < p2.viewCount ? 1 : p1.viewCount > p2.viewCount ? -1 : 0
      );
    }
    else {
      videoDoc.sort((p1, p2) => new Date(p1.releaseDate) < new Date(p2.releaseDate) ? 1 : new Date(p1.releaseDate) > new Date(p2.releaseDate) ? -1 : 0
      );
    }
    return videoDoc;
  };

  getVideoById = async (id) => {
    const vaildId = ObjectId.isValid(id);
    if (!vaildId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "videoId must be a valid mongo id");
    }
    const videoByIdDoc = await Video.findById(id);
    if(!videoByIdDoc){
      throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }
    return videoByIdDoc;
  }

  
  postVideo = async (body) => {
    console.log(body)
    const postVideoDoc = await Video.create(body);
    const savePostVideoDoc = postVideoDoc.save();
    return savePostVideoDoc;
  }

  updateViewCount = async (id) => {
    const vaildId = ObjectId.isValid(id);
    if (!vaildId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "videoId must be a valid mongo id");
    }
    let videoByIdDoc = await Video.findById(id);
    if(!videoByIdDoc){
      throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }
    if (videoByIdDoc) {
      videoByIdDoc.viewCount += 1;
      await videoByIdDoc.save();
    }
  }

  updateVoteCount = async (id, body) => {
    const { vote, change } = body;
    let videoByIdDoc = await Video.findById(id);
    if(!videoByIdDoc){
      throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }
    if (videoByIdDoc) {
      let changeVoteType;
      if (vote == "upVote") {
        changeVoteType = "upVotes";
      }
      else {
        changeVoteType = "downVotes";
      }
      const preVotes = videoByIdDoc.votes[changeVoteType];
      let newVotes = preVotes;
      if (change == "increase") {
        newVotes += 1;
      }
      else {
        newVotes -= 1;
      }
      videoByIdDoc.votes[changeVoteType] = newVotes;
      await videoByIdDoc.save();
    }
  }
}

module.exports = videoSevice;
