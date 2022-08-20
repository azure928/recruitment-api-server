const jobRepo = require('../repos/job-posting');

const createJobPosting = async (req, res) => {
  try {
    const { company_id, position, compensation, content, skill } = req.body;
    //console.log('req.body 확인 : ', req.body);

    await jobRepo.createJobPosting(
      company_id,
      position,
      compensation,
      content,
      skill
    );

    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: 'FAIL' });
  }
};

const updateJobPosting = async (req, res) => {
  try {
    const job_posting_id = req.params.job_posting_id;
    const { position, compensation, content, skill } = req.body;
    //console.log('req.prams 확인 : ', req.prams);
    //console.log('req.body 확인 : ', req.body);

    const result = await jobRepo.updateJobPosting(
      job_posting_id,
      position,
      compensation,
      content,
      skill
    );

    console.log('result : ', result);

    res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: 'FAIL' });
  }
};

module.exports = { createJobPosting, updateJobPosting };
