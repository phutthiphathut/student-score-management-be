module.exports = (app) => {
  const appeal = require("../controllers/appeal.controller.js");

  var router = require("express").Router();

  // Find all appeals
  router.get("/", appeal.findAllAppeals);

  // Find appeal by student id and evaluation id
  router.get(
    "/student/:student_id/evaluation/:evaluation_id",
    appeal.findOneByPK
  );

  // Update appeal status by student id and evaluation id
  router.put(
    "/student/:student_id/evaluation/:evaluation_id/status",
    appeal.updateStatus
  );

  // Update appeal remark by student id and evaluation id
  router.put(
    "/student/:student_id/evaluation/:evaluation_id/remark",
    appeal.updateRemark
  );

  app.use("/api/appeals", router);
};
