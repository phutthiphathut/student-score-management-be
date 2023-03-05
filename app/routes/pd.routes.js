
module.exports = app => {
    const user = require("../controllers/users.controller.js");
    const course = require("../controllers/course.controller.js");
    const appeal = require("../controllers/appeal.controller.js");
    const evaluation = require("../controllers/evaluation.controller.js");
    const evaluation_score = require("../controllers/evaluation_score.controller.js");
    var router = require("express").Router();
  
    //get course list
    router.get("/course_list/:pd_id/", course.findOne);
    
    // get appeal result list and appeal remark
    router.get("/appeal_result/:pd_id/", appeal.findOnepd);
    
    //get a course's evaluations total and received score
    router.get("/course_detail/:pd_id/:course_id", evaluation.findOnepd);
  
    // get rubric total and recieved score
    router.get("/appeal_result/:pd_id/", rubric.findOnepd);

    // get feedback
    router.get("/appeal_result/:pd_id/", appeal.findOnepd);


    //send score appeal
    router.post("/appeal_result/:pd_id/", appeal.create);


    //get total score
    router.get("/appeal_result/:pd_id/", appeal.getpdTotal);



    app.use('/api/pd', router);
  };
