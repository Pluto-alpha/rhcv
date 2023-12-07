const express = require('express');
const router = express.Router();
const { addVisitor, GetAllvisitor, GetVisitor, updateVisitor, deleteVisitor } = require('../controllers/visitor-controller');
//const verifyToken = require('../middlewares/validateTokenHandler')



router.post('/visitor', addVisitor);
router.get('/visitor', GetAllvisitor);
router.get('/visitor/:id', GetVisitor);
router.put('/visitor/:id', updateVisitor);
router.delete('/visitor/:id', deleteVisitor);



module.exports = router;