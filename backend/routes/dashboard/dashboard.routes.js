const router = require("express").Router();
const ctrl = require("../../controllers/dashboard/dashboard.controller");

router.get("/stats/:eventId", ctrl.stats);

module.exports = router;