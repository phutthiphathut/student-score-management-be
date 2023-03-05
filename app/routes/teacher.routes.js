
module.exports = app => {
    const user = require("../controllers/users.controller.js");
    const course = require("../controllers/course.controller.js");
    const appeal = require("../controllers/appeal.controller.js");
    const evaluation = require("../controllers/evaluation.controller.js");
    const evaluation_score = require("../controllers/evaluation_score.controller.js");
    const rubric = require("../controllers/rubric.controller.js");
    var router = require("express").Router();
  
    //get course list
    router.get("/course_list/:teacher_id/", teach.findOneTeacher);
    
    //get course date and time
    

    // get course roster
    router.get("/course_list/course_roster/:teacher_id/:course_id", teach.findClassRoster);
    
    // get each student total score in that course


    //get a course's evaluations total and received score
    router.get("/course_list/course_roster/student_detail/:student_id/:course_id", evaluation.findOneStudent);
  
    //Update course's rubric score
    router.put('/course_list/course_roster/student_detail/:teacher_id', rubric.insertRubricScore);
    
    //Add Feedback
    router.post("/course_list/course_roster/student_detail/Feedback/:feedback/:student_id/", insertFeedback);


    app.use('/api/teacher', router);
  };
