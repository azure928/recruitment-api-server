const express = require('express');
const testRouter = require('./test');

const router = express.Router();
router.use(testRouter);

module.exports = router;
