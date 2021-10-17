const {Router} = require('express');
const chatsController = require('./../controller/chats_controller');


const router = Router();

router.get('/',chatsController.listPrivateChat);
router.put('/:id',chatsController.updateChatMessageStatus);
router.delete('/:id',chatsController.deletePrivateChat);

module.exports = router;
