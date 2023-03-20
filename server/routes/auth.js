const router = require('express').Router();
const authController = require('../controllers/auth');
router.get('/login', authController.signup);

router.get('/another-route', (req, res) => {
	// router code here
});

module.exports = router;
