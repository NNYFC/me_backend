const {Router} = require('express');
const quizController = require('./../controller/quiz_controller');


const router = Router();

router.get('/',quizController.listThemeQuiz);
router.post('/',quizController.createQuiz);
router.put('/:id',quizController.updateQuiz);

module.exports = router;
