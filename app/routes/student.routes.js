module.exports = (app) => {
  const student = require("../controllers/student.controller.js");

  var router = require("express").Router();

  // Find all courses
  router.get("/:student_id/courses", student.findAllCourses);

  // Find appeals by student id
  router.get("/appeals/students/:student_id", student.findAppealsByStudent);

  // Find appeal by student id and evaluation id
  router.get(
    "/appeals/evaluations/:evaluation_id/students/:student_id",
    student.findOneAppealByPk
  );

  // Find student scores by section
  router.get(
    "/:course_id/sections/:section/students/:student_id",
    student.findStudentScoresBySection
  );

  // Find evaluation by evaluation id
  router.get("/evaluations/:evaluation_id", student.findOneEvaluation);

  // Find evaluation feedback
  router.get(
    "/evaluations/:evaluation_id/students/:student_id/feedback",
    student.findEvalutaionFeedback
  );

  // Find evaluation appeal
  router.get(
    "/evaluations/:evaluation_id/students/:student_id/appeal",
    student.findEvaluationAppeal
  );

  // Create new evaluation appeal
  router.post(
    "/evaluations/:evaluation_id/students/:student_id/appeal",
    student.createAppeal
  );

  // Update evaluation appeal reason
  router.put(
    "/evaluations/:evaluation_id/students/:student_id/appeal",
    student.updateAppealReason
  );

  app.use("/api/student", router);
};
