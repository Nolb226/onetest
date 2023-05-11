const router = require('express').Router();
const accountController = require('../controllers/accountController');
const { isAuth } = require('../middleware/is-auth');
const { isWho } = require('../middleware/is-who');

router.use(isAuth);

router.get('/', accountController.getUserAccount);

router.get('/permissions', accountController.getCurrentPermission);

router.get('/another-route', (req, res) => {
	// router code here
});

router.get('/:accountId/edit',accountController.getAccount) 
router.put('/:accountId/edit',accountController.putAccount) 
router.patch('/:accountId/pass/edit',accountController.patchPass )

module.exports = router;
