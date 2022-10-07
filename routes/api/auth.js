const express = require('express');
const { validateBody, authenticate} = require("../../middlewares");
const { ctrlWrapper } = require("../../helper");
const {schemas} = require("../../models/user")

const {auth: ctrl} = require("../../controllers")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch('/',authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.updateSubscription))


module.exports = router;