const {Router} = require('express');
const testcenterController = require('./../controller/testcenters_controller');


const router = Router();

router.get('/',testcenterController.listTestCenters);
router.post('/',testcenterController.createTestCenters);
router.put('/:id',testcenterController.updateTestCenters);
router.delete('/:id',testcenterController.deleteTestCenters);

module.exports = router;
