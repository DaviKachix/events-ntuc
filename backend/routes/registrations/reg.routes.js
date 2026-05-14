const router = require("express").Router();
const controller = require("../../controllers/registrations/registration.controller");

router.post("/register/:id", controller.register);

module.exports = router;
