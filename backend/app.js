const express = require("express");
const routes = require("./routes/v1")
const { errorHandler } = require("./middleware/error");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");

const app = express();

app.use(express.json());
app.use("/v1", routes)
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorHandler);
module.exports = app;