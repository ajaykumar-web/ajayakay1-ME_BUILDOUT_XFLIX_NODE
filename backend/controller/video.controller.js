const videoSevice = require("../service/video.service");
const videoSeviceInstance = new videoSevice();
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const getAllVideos = catchAsync(async (req, res) => {
  const title = req.query.title ? req.query.title : "";
  const contentRating = req.query.contentRating ? req.query.contentRating : "All";
  const genres = req.query.genres ? req.query.genres : ["All"];
  const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";
  const allVideos = await videoSeviceInstance.getVideo(title, contentRating, genres, sortBy);
  res.status(httpStatus.OK).json({videos: allVideos});
});

const getVideosbyId = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const getVideo = await videoSeviceInstance.getVideoById(videoId);
  res.status(httpStatus.OK).json(getVideo);
});

const postNewVideo = catchAsync(async (req, res) => {
  const { body } = req;
  const postvideoDoc = await videoSeviceInstance.postVideo(body);
  res.status(httpStatus.CREATED).json(postvideoDoc);

});

const updateCount = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  await videoSeviceInstance.updateViewCount(videoId);
  res.status(httpStatus.CREATED).json({ message: "Video count increased Successfully." });
});

const updateVote = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { body } = req;
  await videoSeviceInstance.updateVoteCount(videoId, body);
  res.status(httpStatus.CREATED).json({ message: "Vote added Successfully." });
});
module.exports = { getAllVideos, getVideosbyId, postNewVideo, updateCount, updateVote };
