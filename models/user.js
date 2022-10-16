const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleSaveError} = require("../helper");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String,
      required: true
    },
    verify: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema
}

const User = model("user", userSchema);

module.exports={
  User,
  schemas,
}