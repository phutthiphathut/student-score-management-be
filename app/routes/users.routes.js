module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Sign up
    router.post("/signup", users.signup);

    // Sign in get information of user
    router.post("/signin", users.signIn);

    app.use('/api/users', router);
  };

