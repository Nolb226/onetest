const router = require('express').Router();
const permissionController = require('../controllers/permissions');
const { isAuth } = require('../middleware/is-auth');

router.use(isAuth);

router.get('/user', permissionController.getUserPermissions);

router.get('/another-route', (req, res) => {
	// router code here
});

module.exports = router;
