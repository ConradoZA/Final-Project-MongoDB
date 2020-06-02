const router = require('express').Router();
const CheckerController = require('../controllers/CheckerController.js');


router.get('/', CheckerController.getAll);
router.post('/', CheckerController.getAll);



module.exports = router;