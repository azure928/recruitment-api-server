var DataTypes = require("sequelize").DataTypes;
var _apply_list = require("./apply_list");
var _company = require("./company");
var _job_posting = require("./job_posting");
var _user = require("./user");

function initModels(sequelize) {
  var apply_list = _apply_list(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var job_posting = _job_posting(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  job_posting.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(job_posting, { as: "job_postings", foreignKey: "company_id"});
  apply_list.belongsTo(job_posting, { as: "job_posting", foreignKey: "job_posting_id"});
  job_posting.hasMany(apply_list, { as: "apply_lists", foreignKey: "job_posting_id"});
  apply_list.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(apply_list, { as: "apply_lists", foreignKey: "user_id"});

  return {
    apply_list,
    company,
    job_posting,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
