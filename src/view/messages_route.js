const {Router} = require('express');
const messagesController = require('./../controller/messages_controller');


const router = Router();

router.get('/',messagesController.listMessages);
router.post('/',messagesController.sendMessagesInForum);
router.delete('/:id',messagesController.deleteForumMessages);

module.exports = router;
