module.exports = app => {
    const user = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", user.create);
  
    // Retrieve all user
    router.get("/", user.findAll);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", user.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", user.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", user.delete);

    
  
  
    app.use('/api/user', router);
  };

