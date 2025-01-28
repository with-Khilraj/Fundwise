const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const { signup, login, forgetPassword, verifyEmail, renderResetPasswordForm, resetPassword, validateToken,
   getUserDetails, updateProfile } = require('../controllers/authController');


// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgetPassword);
router.get('/reset/:token', renderResetPasswordForm);
router.post('/reset/:token', resetPassword);
router.get('/validate-token', authMiddleware, validateToken); 
router.get('/profile/:id', authMiddleware, getUserDetails);
router.put('/update-profile', authMiddleware, upload.single('profileImage'), updateProfile);


router.get('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
