const db = require("../models");

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.rubric_title || !req.body.full_score || !req.body.evaluation_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Rubric
  const rubric = {
    rubric_title: req.body.rubric_title,
    full_score: req.body.full_score,
    evaluation_id: req.body.evaluation_id,
  };

  // Save Rubric in the database
  const [results, metadata] = await db.sequelize.query(`
    INSERT INTO Rubric (rubric_title, full_score, evaluation_id) 
    VALUES ('${rubric.rubric_title}', ${rubric.full_score}, ${rubric.evaluation_id})
  `);

  res.send(results);
};

exports.findAll = async (req, res) => {
  const [results, metadata] = await db.sequelize.query("SELECT * FROM Rubric");
  res.send(results);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const [results, metadata] = await db.sequelize.query(`SELECT * FROM Rubric WHERE rubric_id = ${id}`);
  res.send(results);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const rubric = {
    rubric_title: req.body.rubric_title,
    full_score: req.body.full_score,
    evaluation_id: req.body.evaluation_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE Rubric
    SET rubric_title = '${rubric.rubric_title}',
      full_score = ${rubric.full_score},
      evaluation_id = ${rubric.evaluation_id}
    WHERE rubric_id = ${id}
  `);

  res.send(results);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const [results, metadata] = await db.sequelize.query(`DELETE FROM Rubric WHERE rubric_id = ${id}`);
  res.send(results);
};
