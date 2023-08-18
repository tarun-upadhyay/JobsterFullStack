const express = require('express');
const router = express.Router();

const { login, register, updateUser } = require('../Controllers/auth');
const auth = require('../middleware/authentication');

const testUser = require('../middleware/testUser');
const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:{
        msg: 'Too many requrests from this IP, Please try again after 15 minutes'
    }
	// store: ... , // Use an external store for more precise rate limiting
})

// router.route('/register').post( register)
// router.route('/login').post( register)
//Both are same
router.post('/register',apiLimiter, register)
router.post('/login',apiLimiter, login)
router.patch('/updateUser', auth, testUser, updateUser)

module.exports = router