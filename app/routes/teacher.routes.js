
module.exports = app => {
    const user = require("../controllers/users.controller.js");
    const course = require("../controllers/course.controller.js");
    const appeal = require("../controllers/appeal.controller.js");
    const evaluation = require("../controllers/evaluation.controller.js");
    const evaluation_score = require("../controllers/evaluation_score.controller.js");
    var router = require("express").Router();
  
    //get course list
    router.get("/course_list/:teacher_id/", teach.findOneTeacher);
    
    // get course roster
    router.get("/appeal_result/:teacher_id/", teach.findClassRoster);
    
    //get a course's evaluations total and received score
    router.get("/course_detail/:student_id/:course_id", evaluation.findOneStudent);
  
    //Update 
    router.get("/appeal_result/:teacher_id/", rubric.findOneteacher);







    
    // // get feedback
    // router.get("/appeal_result/:teacher_id/", appeal.findOneteacher);


    // //send score appeal
    // router.post("/appeal_result/:teacher_id/", appeal.create);


    // //get total score
    // router.get("/appeal_result/:teacher_id/", appeal.getteacherTotal);



    app.use('/api/teacher', router);
  };
