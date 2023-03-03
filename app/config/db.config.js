module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "BonustapMeng2012!",
    DB: "ScoreManagementWebsite",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };