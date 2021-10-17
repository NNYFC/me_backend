const {Router} = require('express');
const userController = require('./../controller/user_controller');


const router = Router();

router.get('/',userController.listUser);
router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.put('/:id',userController.updateUser);
router.get('/role',userController.listRoles);
router.post('/role',userController.createRole);
router.post('/chat/send',userController.sendchatPrivately);

module.exports = router;
