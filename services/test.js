const testRepo = require('../repos/test');

const test = async (req, res) => {
  try {
    //const studentId = req.params.student_id;
    //console.log('student_id 확인 : ', studentId);

    const selectedUser = await testRepo.test();

    //console.log('selectedStudent 확인 : ', selectedStudent);
    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { test };
