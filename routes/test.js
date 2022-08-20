const express = require('express');
const testServices = require('../services/test');
const router = express.Router();

router.get('/test', testServices.test);

module.exports = router;
