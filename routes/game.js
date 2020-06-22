const router = require("express").Router();
const CheckerGameController = require("../controllers/CheckerGameController.js");

router.post("/invitation", CheckerGameController.sendNewGameInvitation);
router.put("/answer", CheckerGameController.answerInvitation);
router.get("/get=:id", CheckerGameController.getGame);
router.get("/getAll=:username", CheckerGameController.getAll);
router.put("/draw-offered",CheckerGameController.drawOffered);
router.put("/draw-accepted",CheckerGameController.drawAccepted);
router.put("/draw-rejected",CheckerGameController.drawRejected);
router.put("/surrender",CheckerGameController.surrenderGame);
router.put("/game-finished",CheckerGameController.finishGame);
router.put("/update-name",CheckerGameController.updateUserName);
router.put("/delete-user", CheckerGameController.handleDelete);

module.exports = router;
