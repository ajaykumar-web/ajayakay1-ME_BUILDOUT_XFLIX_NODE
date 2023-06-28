const videoRouter = require("./video.route")
const router =  require("express").Router();

router.use("/videos", videoRouter);

module.exports = router