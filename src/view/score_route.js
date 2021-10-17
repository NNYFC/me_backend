const {Router} = require('express');
const scoreController = require('./../controller/score_controller');


const router = Router();

router.get('/',scoreController.listScore);
router.post('/',scoreController.createScore);
router.put('/:id',scoreController.updateScore);

module.exports = router;
