const router = require('express').Router();
const adminController = require('../controllers/admin');
const { route } = require('./auth');

router.get('/accounts', adminController.getAllAccounts);
router.get('/accounts/:accountId', adminController.getAccount);
router.put('/accounts/:accountId', adminController.putAcount)

// router.get('/classes', adminController.getAllClasses);

router.get('/permissions', adminController.getAllPermissions);
router.post('/pemissions', adminController.postPermission)
router.get('/permissions/:permissionId/functions',adminController.getFuntionOfPermission)
router.put('/permissions/:permissionId',adminController.putFuntionOfPermission)
// router.get('/exams', adminController.getAllExams);
module.exports = router;
