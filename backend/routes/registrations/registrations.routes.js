const express = require("express");
const router = express.Router();

const session = require("../../controllers/registrations/session.controller");
const participant = require("../../controllers/registrations/participant.controller");
const payment = require("../../controllers/registrations/payment.controller");

// SESSION
router.post("/session/create", session.createSession);
router.get("/session/:uuid", session.getSession);

// PARTICIPANTS
router.post("/session/:uuid/participant", participant.addParticipant);
router.get("/session/:uuid/participants", participant.getParticipants);

// PAYMENT
router.post("/payment/init", payment.initPayment);
router.post("/payment/confirm", payment.confirmPayment);

module.exports = router;