
module.exports = app => {
    const student = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  

    router.get("/course_list/:student_id/:idsmt");

    // // Create a new Tutorial
    // router.post("/", student.create);
  
    // // Retrieve all student
    // router.get("/", student.findAll);
  
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", student.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", student.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", student.delete);

    
  
  
    app.use('/api/student', router);
  };
