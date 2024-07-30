const express = require('express');
const router = express.Router();
const cors = require('cors');
const authenticateToken = require('../middleware/authenticate');
const { registerUser, loginUser, getProfile, exportData, refreshToken } = require('../controllers/authController');


router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.get('/profile', authenticateToken , getProfile);
router.get('/export', authenticateToken , exportData);


module.exports = router;