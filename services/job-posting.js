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

    const selectedJobPosting = await jobRepo.readJobPostingByJobPostingId(
      job_posting_id
    );

    console.log("selectedJobPosting 확인 : ", selectedJobPosting);

    if (!selectedJobPosting) {
      return res
        .status(404)
        .json({ message: "해당 공고는 존재하지 않습니다." });
    } else {
      const result = await jobRepo.updateJobPosting(
        job_posting_id,
        position,
        compensation,
        content,
        skill
      );

      console.log("result 확인 : ", result);
      res.status(200).json({ message: "SUCCESS" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
};

const deleteJobPosting = async (req, res) => {
  try {
    const job_posting_id = req.params.job_posting_id;
    console.log("req.params 확인 : ", req.params);

    const selectedJobPosting = await jobRepo.readJobPostingByJobPostingId(
      job_posting_id
    );

    console.log("selectedJobPosting 확인 : ", selectedJobPosting);

    if (!selectedJobPosting) {
      return res
        .status(404)
        .json({ message: "해당 공고는 존재하지 않습니다." });
    } else {
      const result = await jobRepo.deleteJobPosting(job_posting_id);

      console.log("result : ", result);

      res.status(200).json({ message: "SUCCESS" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
};

async function readJobPostings(req, res) {
  try {
    const keyword = req.query.keyword;
    console.log("키워드 확인!!", keyword);

    let selectedJobPostingLists;

    if (keyword) {
      //console.log('검색 키워드 있음');
      selectedJobPostingLists = await jobRepo.readJobPostingsByKeyword(keyword);
    } else {
      //console.log('검색 키워드 없음');
      selectedJobPostingLists = await jobRepo.readJobPostings();
    }

    //console.log('data : ', data);

    res.status(200).json(selectedJobPostingLists);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: "FAIL" });
  }
}

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

    const otherJobPostingsIdArr = otherJobPostings.map(obj => obj.id);

    //console.log('otherJobPostingsIdArr 확인!!!', otherJobPostingsIdArr );

    const result = {
      채용공고_id: selectedJobPosting.id,
      회사명: selectedJobPosting.company.company_name,
      국가: selectedJobPosting.company.country,
      지역: selectedJobPosting.company.region,
      채용포지션: selectedJobPosting.position,
      채용보상금: selectedJobPosting.compensation,
      사용기술: selectedJobPosting.skill,
      채용내용: selectedJobPosting.content,
      회사가올린다른채용공고: otherJobPostingsIdArr,
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
