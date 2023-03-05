module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Sign up
    router.post("/", users.create);

    // Sign in get information of user
    router.get("/:id", users.findOne);
  

    
    // Retrieve all users
    router.get("/", users.findAll);
  
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);

  
    app.use('/api/users', router);
  };

