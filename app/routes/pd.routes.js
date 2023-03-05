
module.exports = app => {
    const user = require("../controllers/users.controller.js");
    const course = require("../controllers/course.controller.js");
    const appeal = require("../controllers/appeal.controller.js");
    const evaluation = require("../controllers/evaluation.controller.js");
    const evaluation_score = require("../controllers/evaluation_score.controller.js");
    var router = require("express").Router();

      //get all course list
      router.get("/course_list/:pd_id/", course.findAll);
    

      // get every student score in a course


      //get every appeal list sent to pd_id


      //Update appeal (Remark column)


      //Update Status on appeal


    


    app.use('/api/pd', router);
  };
