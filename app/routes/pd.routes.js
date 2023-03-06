module.exports = (app) => {
  const pd = require("../controllers/pd.controller.js");

  var router = require("express").Router();

  // Find all courses
  router.get("/courses", pd.findAllCourses);

  // Find all students total scores by course id and section
  router.get(
    "/:course_id/sections/:section/students/score",
    pd.findStudentScoresBySection
  );

  // Find all appeals
  router.get("/appeals", pd.findAllAppeals);

  // Find appeal by student id and evaluation id
  router.get(
    "/appeals/student/:student_id/evaluation/:evaluation_id",
    pd.findOneByPK
  );

  // Update appeal status by student id and evaluation id
  router.put(
    "/appeals/student/:student_id/evaluation/:evaluation_id/status",
    pd.updateAppealStatus
  );

  // Update appeal remark by student id and evaluation id
  router.put(
    "/appeals/student/:student_id/evaluation/:evaluation_id/remark",
    pd.updateAppealRemark
  );

  app.use("/api/pd", router);
};
