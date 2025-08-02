const express = require('express');
const userController = require('../controllers/User.js');
const authenticateToken = require('../middleware/AuthMiddleware.js');

const router = express.Router();

router.get('/',userController.getAllUser);
router.get('/:id',userController.getUserByID);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.post('/login', userController.loginUser);
// Protected routes (require valid token)
router.get('/', authenticateToken, userController.getAllUser);
router.get('/:id', authenticateToken, userController.getUserByID);

module.exports = router;