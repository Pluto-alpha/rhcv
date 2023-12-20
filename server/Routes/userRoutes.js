const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getAUser, updateUser, deleteUser, logout, resetPaswrd, dashboardData } = require('../controllers/user-controller');
const { verifyReceptionToken, verifyToken } = require('../middlewares/validateTokenHandler');


router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/reset-password', resetPaswrd);

router.get('/dashboard', verifyReceptionToken, dashboardData);

/**protected routes middleware */
router.use(verifyToken);
router.post('/register', registerUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getAUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);



module.exports = router;