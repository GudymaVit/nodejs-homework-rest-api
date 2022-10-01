const express = require('express');

const ctrl = require("../../controllers/contacts");

const ctrlWrapper = require("../../helper/ctrlWrapper");

const { validateBody, isValidId } = require("../../middlewares");

const {schemas} = require("../../models/contact")

const router = express.Router();


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', isValidId, validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;
