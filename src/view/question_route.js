const {Router} = require('express');
const questionController = require('./../controller/question_controller');


const router = Router();

router.get('/',questionController.listQuestions);
router.post('/',questionController.createQuestions);
router.put('/:id',questionController.updateQuestions);
router.delete('/:id',questionController.deleteQuestion);

module.exports = router;
