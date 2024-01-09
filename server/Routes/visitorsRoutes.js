const express = require('express');
const router = express.Router();
const { GetAllvisitorList, addVisitor, GetAllvisitor, GetVisitor, updateVisitor, deleteVisitor, visitorPass, updateVisitorImg } = require('../controllers/visitor-controller');
const { verifyReceptionToken, verifyToken } = require('../middlewares/validateTokenHandler');
const upload = require('../config/multer')


// Apply verifyReceptionToken for all routes
router.use(verifyReceptionToken);

// Routes
router.get('/all-visitors', GetAllvisitorList);
router.post('/visitor', addVisitor);
router.get('/visitor', GetAllvisitor);
router.get('/visitor/:id', GetVisitor);
router.put('/visitor/:id', updateVisitor);
router.post('/visitor/:id', upload.single('image'), updateVisitorImg);
router.get('/visitor/generate-pass/:id', visitorPass);

// Apply verifyToken only for the delete route
router.delete('/visitor/:id', verifyToken, deleteVisitor);




module.exports = router;