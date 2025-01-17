const express = require('express');
const router = express.Router();
const { redirectToUrl } = require('../controllers/urlController');

// Public route for redirection
router.get('/:shortCode', redirectToUrl);

module.exports = router;
