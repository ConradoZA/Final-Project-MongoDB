const router = require('express').Router();
const CheckerController = require('../controllers/CheckerController.js');


router.post('/invitation', CheckerController.sendNewGameInvitation);
router.post('/accept', CheckerController.acceptNewGame);
router.get('/get-game/:id', CheckerController.getGame);



module.exports = router;