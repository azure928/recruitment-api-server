const jobRepo = require("../repos/job-posting");

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

    res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
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

    console.log("result : ", result);

    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
};

const deleteJobPosting = async (req, res) => {
  try {
    const job_posting_id = req.params.job_posting_id;
    console.log("req.prams 확인 : ", req.prams);

    const result = await jobRepo.deleteJobPosting(job_posting_id);

    console.log("result : ", result);

    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
};

const readJobPostings = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const data = await jobRepo.readJobPostings(keyword);

    //console.log('data : ', data);

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
};

const readJobPostingDetailByPostingid = async (req, res) => {
  try {
    const job_posting_id = req.params.job_posting_id;
    //console.log("req.prams 확인!!! ", req.params);

    const selectedJobPosting = await jobRepo.readJobPostingDetailByPostingid(
      job_posting_id
    );
    //console.log('selectedJobPosting : ', selectedJobPosting);

    
    const otherJobPostings = await jobRepo.readJobPostingsByCompanyId(
      selectedJobPosting.company.id,
      job_posting_id
    );
    //console.log('otherJobPostings 확인!!!!!!! ', otherJobPostings);

    const otherJobPostingsIdArr = otherJobPostings.map(obj=>obj.id);

    //console.log('otherJobPostingsIdArr 확인!!!', otherJobPostingsIdArr );

    const result = {
      '채용공고_id' : selectedJobPosting.id,
      '회사명': selectedJobPosting.company.company_name,
      '국가': selectedJobPosting.company.country,
      '지역': selectedJobPosting.company.region,
      '채용포지션': selectedJobPosting.position,
      '채용보상금': selectedJobPosting.compensation,
      '사용기술': selectedJobPosting.skill,
      '채용내용': selectedJobPosting.content,
      '회사가올린다른채용공고': otherJobPostingsIdArr
    };

    //console.log('result 확인 !!!!!!!!', result);

    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
};

module.exports = {
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  readJobPostings,
  readJobPostingDetailByPostingid,
};
