const db = require('../models/index');
const JobPosting = db.job_posting;
const User = db.user;
const Company = db.company;
const SQ = require('sequelize');
const Sequelize = SQ.Sequelize;
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

const readJobPostings = async keyword => {
  return await JobPosting.findAll({
    attributes: [
      ['id', '채용공고_id'],
      [Sequelize.col('company.company_name'), '회사명'],
      [Sequelize.col('company.country'), '국가'],
      [Sequelize.col('company.region'), '지역'],
      ['position', '채용포지션'],
      ['compensation', '채용보상금'],
      ['skill', '사용기술'],
    ],
    include: {
      model: Company,
      as: 'company',
      attributes: [],
      where: {
        company_name: { [Op.like]: '%' + keyword + '%' },
      },
    },
  });
};

const readJobPostingDetail = async job_posting_id => {
  return await JobPosting.findOne({
    attributes: [
      ['id', '채용공고_id'],
      [Sequelize.col('company.company_name'), '회사명'],
      [Sequelize.col('company.country'), '국가'],
      [Sequelize.col('company.region'), '지역'],
      ['position', '채용포지션'],
      ['compensation', '채용보상금'],
      ['skill', '사용기술'],
      ['content', '채용내용'],
    ],
    include: {
      model: Company,
      as: 'company',
      attributes: [],
    },
    where: {
      id: job_posting_id,
    },
  });
};

module.exports = {
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  readJobPostings,
  readJobPostingDetail,
};
