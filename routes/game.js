const router = require("express").Router();
const CheckerGameController = require("../controllers/CheckerGameController.js");

router.post("/invitation", CheckerGameController.sendNewGameInvitation);
router.put("/answer", CheckerGameController.answerInvitation);
router.get("/get=:id", CheckerGameController.getGame);
router.get("/getAll=:username", CheckerGameController.getAll);
router.put("/draw-offered",CheckerGameController.drawOffered);
router.put("/draw-accepted",CheckerGameController.drawAccepted);

module.exports = router;
