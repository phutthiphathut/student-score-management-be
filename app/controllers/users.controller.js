const db = require("../models");

exports.signIn = async (req, res) => {
  // Validate request
  if (!req.body.email_address || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // User authen
  const user = {
    email_address: req.body.email_address,
    password: req.body.password,
  };

  // Save User in the database
  const [results, metadata] = await db.sequelize.query(`
  SELECT * FROM users WHERE email_address='${user.email_address}' 
  AND password='${user.password}'`);

  if (results.length) {
    const response = {
      user_id: results[0].user_id,
      first_name: results[0].first_name,
      last_name: results[0].last_name,
      role: results[0].role,
    };
    res.send(response);
  } else {
    res.status(401).send(results);
  }
};

exports.signup = async (req, res) => {
  // Validate request
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email_address ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    password: req.body.password,
    role: "student",
  };

  // Save User in the database
  const [results, metadata] = await db.sequelize
    .query(`INSERT INTO users (first_name, last_name, email_address, password, role) values 
    ('${user.first_name}', '${user.last_name}', '${user.email_address}', '${user.password}', '${user.role}')`);

  res.send(results);
};
