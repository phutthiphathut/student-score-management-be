module.exports = (app) => {
  const student = require("../controllers/student.controller.js");

  var router = require("express").Router();

  app.use("/api/student", router);
};
