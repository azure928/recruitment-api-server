const db = require("../models/index");
const JobPosting = db.job_posting;
const User = db.user;
const Company = db.company;
const SQ = require("sequelize");
const Sequelize = SQ.Sequelize;
const sequelize = require("sequelize");
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

async function readJobPostings() {
  //console.log('검색 키워드 없음 확인');
  return await JobPosting.findAll({
    attributes: [
      ["id", "채용공고_id"],
      [Sequelize.col("company.company_name"), "회사명"],
      [Sequelize.col("company.country"), "국가"],
      [Sequelize.col("company.region"), "지역"],
      ["position", "채용포지션"],
      ["compensation", "채용보상금"],
      ["skill", "사용기술"],
    ],
    include: {
      model: Company,
      as: "company",
      attributes: [],
    },
  });
}

const readJobPostingsByKeyword = async keyword => {
  //console.log('검색 키워드 있음 확인');
  return await JobPosting.findAll({
    attributes: [
      ["id", "채용공고_id"],
      [Sequelize.col("company.company_name"), "회사명"],
      [Sequelize.col("company.country"), "국가"],
      [Sequelize.col("company.region"), "지역"],
      ["position", "채용포지션"],
      ["compensation", "채용보상금"],
      ["skill", "사용기술"],
    ],
    include: [
      {
        model: Company,
        as: "company",
        attributes: [],
      },
    ],
    where: {
      [Op.or]: [
        {
          "$company.company_name$": {
            [Op.like]: "%" + keyword + "%",
          },
        },
        {
          "$company.region$": {
            [Op.like]: "%" + keyword + "%",
          },
        },
        {
          "$company.country$": {
            [Op.like]: "%" + keyword + "%",
          },
        },
        {
          skill: {
            [Op.like]: "%" + keyword + "%",
          },
        },
        {
          position: {
            [Op.like]: "%" + keyword + "%",
          },
        },
      ],
    },
    order: [["id", "ASC"]],
  });
};

const readJobPostingDetailByPostingid = async job_posting_id => {
  return await JobPosting.findOne({
    attributes: ["id", "position", "compensation", "content", "skill"],
    include: {
      model: Company,
      as: "company",
      attributes: ["id", "company_name", "country", "region"],
    },
    where: {
      id: job_posting_id,
    },
  });
};

async function readJobPostingsByCompanyId(company_id, job_posting_id) {
  return await JobPosting.findAll({
    attributes: ["id"],
    where: {
      company_id: company_id,
      id: { [Op.not]: job_posting_id },
    },
  });
}

module.exports = {
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  readJobPostingsByKeyword,
  readJobPostings,
  readJobPostingDetailByPostingid,
  readJobPostingsByCompanyId,
};
