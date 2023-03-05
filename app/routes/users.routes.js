module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Sign up
    router.post("/signup", users.signup);

    // Sign in get information of user
    router.post("/signin", users.signIn);
  
    // // Retrieve all users
    // router.get("/", users.findAll);
  
    // // Update a Tutorial with id
    // router.put("/:id", users.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", users.delete);

    app.use('/api/users', router);
  };

