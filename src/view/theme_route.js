const {Router} = require('express');
const themeController = require('./../controller/theme_controller');


const router = Router();

router.get('/',themeController.listTheme);
router.post('/',themeController.createTheme);
router.put('/:id',themeController.updateTheme);

module.exports = router;
