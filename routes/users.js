const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const { authentication } = require('../middleware/authenticaction');
const uploader = require('../middleware/multer.js');


router.get('/', authentication, UserController.getAll);
router.get('/info', authentication, UserController.getMyInfo);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', authentication, UserController.logout);
router.post('/upload', authentication, uploader, UserController.uploadImage);
router.put('/update', authentication, UserController.updateUser);
router.delete('/delete', authentication, UserController.deleteUser);
router.post('/recover', UserController.sendForgottenMail);
router.get('/recover/get', authentication, UserController.getPassword);
router.post('/recover/password', UserController.recoverPassword);
router.post('/recover/new', authentication, UserController.newPassword);



module.exports = router;