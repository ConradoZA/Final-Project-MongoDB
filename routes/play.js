const router = require("express").Router();
const CheckerPlayController = require("../controllers/CheckerPlayController.js");

router.get("/get=:id", CheckerPlayController.getPlay);
router.get("/start", CheckerPlayController.initialize);
router.put("/new-turn", CheckerPlayController.newTurn);

module.exports = router;
