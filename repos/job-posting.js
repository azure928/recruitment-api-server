const db = require('../models/index');
const JobPosting = db.job_posting;
const User = db.user;
const ApplyList = db.apply_list;
const Company = db.company;

const createJobPosting = async (
  company_id,
  position,
  compensation,
  content,
  skill
) => {
  return await JobPosting.create({
    company_id: company_id,
    position: position,
    compensation: compensation,
    content: content,
    skill: skill,
  });
};

module.exports = { createJobPosting };
