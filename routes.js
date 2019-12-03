const router = require('express').Router();
const AppController = require('./controllers/AppController')

router.post('/upload', AppController.uploadData);
router.get('/display', AppController.displayData);

module.exports = router;