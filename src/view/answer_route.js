const {Router} = require('express');
const answerController = require('./../controller/answer_controller');


const router = Router();

router.get('/',answerController.listAnswers);
router.post('/',answerController.createAnswers);
router.put('/:id',answerController.updateAnswers);
router.delete('/:id',answerController.deleteAnswer);

module.exports = router;
