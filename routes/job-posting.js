const express = require('express');
const jobServices = require('../services/job-posting');
const router = express.Router();

// 채용공고 등록
router.post('/jobpostings', jobServices.createJobPosting);
// 채용공고 수정
router.put('/jobpostings/:job_posting_id', jobServices.updateJobPosting);
// 채용공고 삭제
router.delete('/jobpostings/:job_posting_id', jobServices.deleteJobPosting);

module.exports = router;
