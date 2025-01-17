const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimitter');
const { shortenUrl, getUserUrls, deleteUrl } = require('../controllers/urlController');

// Protected API Routes with rate limiting
router.post('/shorten', auth, rateLimiter, shortenUrl);
router.get('/user', auth, rateLimiter, getUserUrls);
router.delete('/:id', auth, rateLimiter, deleteUrl);

module.exports = router;