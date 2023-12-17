const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getAUser, updateUser, deleteUser, logout, resetPaswrd, refreshToken } = require('../controllers/user-controller');
const { verifyToken } = require('../middlewares/validateTokenHandler')

router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/reset-password', resetPaswrd);


/**protected routes middleware */
router.use(verifyToken);
router.post('/register', registerUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getAUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/refresh-token', refreshToken);



module.exports = router;