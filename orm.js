const SequelizeAuto = require("sequelize-auto");

const auto = new SequelizeAuto(
  "wanted_pre_onboarding",
  "testuser",
  "testuser",
  {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    directory: "./models",
    //noAlias: true // as 별칭 미설정 여부
  }
);
auto.run(err => {
  if (err) throw err;
});
