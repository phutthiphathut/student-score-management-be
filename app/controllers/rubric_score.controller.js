const db = require("../models");

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.student_id || !req.body.rubric_id || !req.body.rubric_received_score) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Rubric Score
  const rubricScore = {
    student_id: req.body.student_id,
    rubric_id: req.body.rubric_id,
    rubric_received_score: req.body.rubric_received_score
  };

  // Save Rubric Score in the database
  const [results, metadata] = await db.sequelize.query(`
    INSERT INTO Rubric_Score (student_id, rubric_id, rubric_received_score) 
    values (${rubricScore.student_id}, ${rubricScore.rubric_id}, ${rubricScore.rubric_received_score})
  `);

  res.send(results);
};

//use
exports.insertRubricScore = async (req, res) => {
  const { student_id, rubric_id, rubric_received_score } = req.body;
  
  try {
    const query = `INSERT INTO Rubric_Score (student_id, rubric_id, rubric_received_score)
                   VALUES ($1, $2, $3)`;
    const values = [student_id, rubric_id, rubric_received_score];
    
    await db.sequelize.query(query, { bind: values });
    res.status(201).send('Rubric score inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting rubric score');
  }
};

exports.findAll = async (req, res) => {
  const [results, metadata] = await db.sequelize.query("SELECT * FROM Rubric_Score");
  res.send(results);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const [results, metadata] = await db.sequelize.query(`
    SELECT * FROM Rubric_Score WHERE student_id=${id}
  `);
  res.send(results);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const rubricScore = {
    rubric_received_score: req.body.rubric_received_score
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE Rubric_Score
    SET rubric_received_score = ${rubricScore.rubric_received_score}
    WHERE student_id = ${id} AND rubric_id = ${req.body.rubric_id}
  `);
  res.send(results);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const rubric_id = req.body.rubric_id;

  const [results, metadata] = await db.sequelize.query(`
    DELETE FROM Rubric_Score WHERE student_id=${id} AND rubric_id=${rubric_id}
  `);

  res.send(results);
};
