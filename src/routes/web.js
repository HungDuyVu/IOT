const express = require('express');
const { getHomepage } = require('../controllers/homeController');
const authController = require('../controllers/authController');
const router = express.Router();

// Khai bao route
router.get('/', getHomepage);

// Đăng ký
router.get('/register', authController.showRegisterForm);
router.post('/register', authController.register);

// Đăng nhập
router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);

router.get('/abc', (req, res) => {
      res.send('check abc')
})

module.exports = router;
  