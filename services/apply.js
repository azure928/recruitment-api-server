const applyRepo = require('../repos/apply');

const createApply = async (req, res) => {
  try {
    const { job_posting_id, user_id } = req.body;
    //console.log('req.body 확인 : ', req.body);

    const applyList = await applyRepo.readApplyListByUserIdPostingId(
      job_posting_id,
      user_id
    );

    //console.log('applyList 확인 : ', applyList);

    if (applyList) {
      return res.status(409).json({ message: 'already exists' });
    } else {
      await applyRepo.createApply(job_posting_id, user_id);
      return res.status(201).json({ message: 'SUCCESS' });
    }
  } catch (error) {
    console.log('에러 메세지 확인 : ', error.message);
    res.status(error.statusCode || 500).json({ message: 'FAIL' });
  }
};

module.exports = { createApply };
