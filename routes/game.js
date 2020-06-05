const router = require("express").Router();
const CheckerGameController = require("../controllers/CheckerGameController.js");

router.post("/invitation", CheckerGameController.sendNewGameInvitation);
router.post("/accept", CheckerGameController.acceptNewGame);
router.get("/get=:id", CheckerGameController.getGame);

module.exports = router;
