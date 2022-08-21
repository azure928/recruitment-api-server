const express = require('express');
const testRouter = require('./test');
const jobRouter = require('./job-posting');
const applyRouter = require('./apply');

const router = express.Router();
router.use(testRouter);
router.use(jobRouter);
router.use(applyRouter);

module.exports = router;
