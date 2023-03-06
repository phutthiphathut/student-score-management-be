module.exports = (app) => {
  const teacher = require("../controllers/teacher.controller.js");

  var router = require("express").Router();

  // Find all courses
  router.get("/:teacher_id/courses", teacher.findAllCourses);

  // Find students by section
  router.get(
    "/:course_id/sections/:section/students",
    teacher.findStudentsBySection
  );

  // Find student scores by section
  router.get(
    "/:course_id/sections/:section/students/:student_id",
    teacher.findStudentScoresBySection
  );

  // Find unregistered students by section
  router.get(
    "/:course_id/sections/:section/unregistered",
    teacher.findUnregisteredStudentsBySection
  );

  // Find evaluation feedback
  router.get(
    "/evaluations/:evaluation_id/students/:student_id",
    teacher.findEvalutaionFeedback
  );

  // Update evaluation feedback
  router.put(
    "/evaluations/:evaluation_id/students/:student_id/feedback",
    teacher.updateEvalutaionFeedback
  );

  // Update evaluation score
  router.put(
    "/evaluations/:evaluation_id/students/:student_id/score",
    teacher.updateEvalutaionScore
  );

  // Add new student to section
  router.post(
    "/:course_id/sections/:section/students/add",
    teacher.addStudentToSection
  );

  // Remove student from section
  router.post(
    "/:course_id/sections/:section/students/remove",
    teacher.removeStudentFromSection
  );

  app.use("/api/teacher", router);
};
