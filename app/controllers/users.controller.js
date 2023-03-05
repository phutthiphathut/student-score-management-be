const db = require("../models");


exports.create = async(req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a User
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address,
      password: req.body.password,
      role: req.body.role
    };
  
    // Save User in the database
    const [results, metadata] = await db.sequelize.query(`INSERT INTO users values 
    (${user.first_name}, ${user.last_name}, ${user.email_address}, ${user.password}, ${user.role})`);

    res.send(results);
  };

  exports.findAll = async(req, res) => {
    const [results, metadata] = await db.sequelize.query("SELECT * FROM users");
    res.send(results);
  };

  exports.findOne = async(req, res) => {
    const id = req.params.id;
    const [results, metadata] = await db.sequelize.query(`SELECT * FROM users where user_id=${id}`);
    res.send(results);
   
  };

  exports.update = async(req, res) => {
    const id = req.params.id;
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address,
      password: req.body.password,
      role: req.body.role
    };
    
    const [results, metadata] = await db.sequelize.query(`
    UPDATE users
    SET first_name =  ${user.first_name}
    last_name =  ${user.last_name}
    email_address =  ${user.email_address}
    password = ${user.password}
    role =  ${user.role}
    WHERE user_id = ${id}`
    );
    res.send(results);
    
  };

  exports.delete = async(req, res) => {
    const id = req.params.id;
    const [results, metadata] = await db.sequelize.query(`DELETE FROM users WHERE user_id=${id}`);
    
  };

