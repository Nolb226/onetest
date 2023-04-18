const router = require('express').Router();

const questionController = require('../controllers/questionController');

router.post('/', questionController.handleQuestion);

module.exports = router;
