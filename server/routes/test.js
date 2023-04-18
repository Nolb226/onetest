const { test } = require('../controllers/test');
const { checkPermission } = require('../middleware/check-permission');
const { isAuth } = require('../middleware/is-auth');

const router = require('express').Router();

router.post('/', test);

router.get('/another-route', (req, res) => {
	// router code here
});

module.exports = router;
