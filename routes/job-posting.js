const express = require('express');
const jobServices = require('../services/job-posting');
const router = express.Router();

// 채용공고 등록
router.post('/jobpostings', jobServices.createJobPosting);
// 채용공고 수정
router.put('/jobpostings/:job_posting_id', jobServices.updateJobPosting);
// 채용공고 삭제
router.delete('/jobpostings/:job_posting_id', jobServices.deleteJobPosting);
// 채용공고 목록 (검색)
router.get('/jobpostings', jobServices.readJobPostings);
// 채용공고 상세 페이지
router.get('/jobpostings/:job_posting_id', jobServices.readJobPostingDetail);

module.exports = router;
