const express = require('express');
const router = express.Router();
const { addVisitor, GetAllvisitor, GetVisitor, updateVisitor, deleteVisitor } = require('../controllers/visitor-controller');
const { verifyReceptionToken, verifyToken } = require('../middlewares/validateTokenHandler');

// Apply verifyReceptionToken for all routes
router.use(verifyReceptionToken);

// Routes
router.post('/visitor', addVisitor);
router.get('/visitor', GetAllvisitor);
router.get('/visitor/:id', GetVisitor);
router.put('/visitor/:id', updateVisitor);

// Apply verifyToken only for the delete route
router.delete('/visitor/:id', verifyToken, deleteVisitor);




module.exports = router;