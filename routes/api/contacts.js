const express = require('express');
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { RequestError } = require("../../helper");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(25).trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  phone: Joi.string().required(),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404)
    }
    res.json(result)

  } catch (error) {
     next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message)
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404)
    }
    res.json({
      message: "contact deleted"
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(`${contactId}`, name, email, phone);
    if (!result) {
      throw RequestError(404)
    }
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})

module.exports = router
