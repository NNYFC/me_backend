const {Router} = require('express');
const forumController = require('./../controller/forum_controller');


const router = Router();

router.get('/',forumController.listAllForums);
router.get('/all',forumController.fetchForumWithMessages);
router.post('/',forumController.createForums);
router.put('/:id',forumController.updateForum);
router.delete('/:id',forumController.deleteForum);

module.exports = router;
