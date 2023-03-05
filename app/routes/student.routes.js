
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
  
    //get course list
    router.get("/course_list/:student_id/", course.findOne);
    

    // get appeal result list and status 
    router.get("/appeal_result/:student_id/", appeal.findOneStudent);
    

    //get appeal remark


    //get a course's evaluations total and received score
    router.get("/course_detail/:student_id/:course_id", evaluation.findOneStudent);
  
    // get rubric total and recieved score
    

    // get feedback
   

    //send score appeal
    router.post("/appeal_result/:student_id/", appeal.create);


    //get total score
    // router.get("/appeal_result/:student_id/", appeal.getStudentTotal);



    app.use('/api/student', router);
  };
