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

module.exports = { createJobPosting };
