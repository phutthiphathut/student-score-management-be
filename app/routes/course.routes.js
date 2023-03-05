module.exports = (app) => {
  const course = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Find all courses
  router.get("/", course.findAllCourses);

  // Find all course evaluations by course id and section
  router.get("/:course_id/sections/:section/evaluations", course.findEvalutionsBySection);

  app.use("/api/courses", router);
};
