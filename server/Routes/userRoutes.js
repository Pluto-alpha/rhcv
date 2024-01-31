const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getAUser, updateUser, deleteUser, logout, resetPaswrd, dashboardData, receptionDashboard } = require('../controllers/user-controller');
const { verifyReceptionToken, verifyToken } = require('../middlewares/validateTokenHandler');
const { findCaseDetail } = require('../controllers/visitor-controller')

router.post('/case', findCaseDetail);
router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/reset-password', resetPaswrd);

router.get('/dashboard', verifyReceptionToken, dashboardData);
router.get('/reception-dashboard', verifyReceptionToken, receptionDashboard);
router.get('/user/:id', getAUser);

/**protected routes middleware */
router.use(verifyToken);
router.post('/register', registerUser);
router.get('/user', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);



module.exports = router;