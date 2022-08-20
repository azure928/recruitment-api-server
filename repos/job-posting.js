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

const updateJobPosting = async (
  job_posting_id,
  position,
  compensation,
  content,
  skill
) => {
  return await JobPosting.update(
    {
      position: position,
      compensation: compensation,
      content: content,
      skill: skill,
    },
    {
      where: {
        id: job_posting_id,
      },
    }
  );
};

const deleteJobPosting = async job_posting_id => {
  return await JobPosting.destroy({
    where: {
      id: job_posting_id,
    },
  });
};

module.exports = { createJobPosting, updateJobPosting, deleteJobPosting };
