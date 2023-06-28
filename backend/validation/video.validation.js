const Joi = require("joi");
const { objectId } = require("./custom.validation");

const postvideo = {
  body: Joi.object().keys({
    videoLink: Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    contentRating: Joi.string().required(),
    releaseDate: Joi.date().required(),
    previewImage: Joi.string().required(),
  }),
};

const getvideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

const view = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

const vote = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    vote: Joi.string().required(),
    change: Joi.string(),
  }),
};
module.exports = { postvideo, getvideo, view, vote };
