const router = require("express").Router();
const ctrl = require("../../controllers/events/event.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

// PUBLIC
router.get("/", ctrl.publicList);

// MUST come before /:slug
router.get("/my/events", auth, ctrl.myEvents);

router.get("/:slug", ctrl.getOne);

// ADMIN
router.post("/", auth, role("admin"), ctrl.create);
router.put("/:id", auth, role("admin"), ctrl.update);
router.delete("/:id", auth, role("admin"), ctrl.remove);

module.exports = router;