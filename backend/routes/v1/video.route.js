const router =  require("express").Router();
const controller = require("../../controller/video.controller");
const validate = require("../../middleware/validate");
const videoValidation = require("../../validation/video.validation");

const getVideo = validate(videoValidation.getvideo);
const postVideo = validate(videoValidation.postvideo);
const viewCount = validate(videoValidation.view);
const voteCount = validate(videoValidation.vote);

router.get("/", controller.getAllVideos);
router.get("/:videoId", getVideo, controller.getVideosbyId);
router.post("/", postVideo, controller.postNewVideo);
router.patch("/:videoId/views", viewCount, controller.updateCount);
router.patch("/:videoId/votes", voteCount, controller.updateVote);

module.exports = router