const db = require('../models/index');
const ApplyList = db.apply_list;

const readApplyListByUserIdPostingId = async (job_posting_id, user_id) => {
  return await ApplyList.findOne({
    where: {
      job_posting_id: job_posting_id,
      user_id: user_id,
    },
  });
};

const createApply = async (job_posting_id, user_id) => {
  return await ApplyList.create({
    job_posting_id: job_posting_id,
    user_id: user_id,
  });
};

module.exports = { createApply, readApplyListByUserIdPostingId };
