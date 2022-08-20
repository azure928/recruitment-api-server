const db = require('../models/index');
const User = db.user;

async function test() {
  //console.log('student_id 확인 : ', studentId);

  let selectedUser = User.findAll({
    where: {
      id: 1,
    },
  }).catch(err => {
    console.error(err);
  });

  return selectedUser;
}

module.exports = { test };
