
module.exports = app => {
    const user = require("../controllers/users.controller.js");
    const teach = require("../controllers/teach.controller.js");
    const course = require("../controllers/course.controller.js");
    const appeal = require("../controllers/appeal.controller.js");
    const evaluation = require("../controllers/evaluation.controller.js");
    const evaluation_score = require("../controllers/evaluation_score.controller.js");
    const rubric = require("../controllers/rubric.controller.js");
    const rubric_score = require("../controllers/rubric_score.controller.js");
    
    var router = require("express").Router();

      //get all course list
      router.get("/course_list/:pd_id/", course.findAll);
    

      // get every student score in a course
      router.get("/course_list/course_stat/:course_id/", evaluation_score.getAllStudentTotal);

      //get every appeal list sent to pd_id
      // router.get("/course_list/appeal_list/:courseid/:pd_id",)

      // //Update Status on appeal
      // router.put("/course_list/appeal_list/appeal_reason",)

      // //Update appeal (Remark column)
      // router.put("/course_list/appeal_list/appeal_reason/appeal_remark",)

    


    app.use('/api/pd', router);
  };
