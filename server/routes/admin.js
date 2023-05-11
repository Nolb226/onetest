const router = require('express').Router();
const adminController = require('../controllers/admin');
const { route } = require('./auth');

router.get('/accounts', adminController.getAllAccounts);
router.get('/accounts/:accountId', adminController.getAccount);
router.put('/accounts/:accountId', adminController.putAcount);
router.patch('/accounts/:accountId', adminController.patchAccount);
router.delete('/accounts/:accountId', adminController.deleteAccount);

// router.get('/classes', adminController.getAllClasses);

router.get('/permissions', adminController.getAllPermissions);
router.get(
	'/permissions/:permissionId/functions',
	adminController.getFuntionOfPermission
);

router.post('/permissions', adminController.postPermission);

router.put(
	'/permissions/:permissionId',
	adminController.putFuntionOfPermission
);

router.delete('/permissions/:permissionId', adminController.deletePermissions);
// router.get('/exams', adminController.getAllExams);
module.exports = router;
