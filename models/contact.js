const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleSaveError} = require("../middlewares")

const contactSchema = new Schema({
     name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

contactSchema.post("save", handleSaveError);

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(25).trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactsSchema,
  updateFavoriteSchema
}

const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    schemas
};