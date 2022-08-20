const express = require('express');
const jobServices = require('../services/job-posting');
const router = express.Router();

// 채용공고 등록
router.post('/jobpostings', jobServices.createJobPosting);

module.exports = router;
