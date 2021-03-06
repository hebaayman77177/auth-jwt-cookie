const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/logout', authController.logout_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);


module.exports = router;