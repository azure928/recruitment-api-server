const express = require('express');
const testRouter = require('./test');
const jobRouter = require('./job-posting');

const router = express.Router();
router.use(testRouter);
router.use(jobRouter);

module.exports = router;
