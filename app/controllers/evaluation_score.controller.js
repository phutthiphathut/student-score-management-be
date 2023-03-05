const db = require("../models");

exports.create = async(req, res) => {
  // Validate request
  if (!req.body.student_id || !req.body.evaluation_id || !req.body.eval_received_score) {
    res.status(400).send({
      message: "Invalid input data!"
    });
    return;
  }

  // Create an evaluation score
  const score = {
    student_id: req.body.student_id,
    evaluation_id: req.body.evaluation_id,
    eval_received_score: req.body.eval_received_score,
    feedback: req.body.feedback || null,
  };

  // Save evaluation score in the database
  const [results, metadata] = await db.sequelize.query(`
    INSERT INTO Evaluation_Score (student_id, evaluation_id, eval_received_score, feedback) 
    VALUES (${score.student_id}, ${score.evaluation_id}, ${score.eval_received_score}, ${score.feedback})
  `);

  res.send(results);
};

exports.findAll = async(req, res) => {
  const [results, metadata] = await db.sequelize.query("SELECT * FROM Evaluation_Score");
  res.send(results);
};

exports.findOne = async(req, res) => {
  const studentId = req.params.student_id;
  const evaluationId = req.params.evaluation_id;
  const [results, metadata] = await db.sequelize.query(`
    SELECT * FROM Evaluation_Score 
    WHERE student_id=${studentId} AND evaluation_id=${evaluationId}
  `);
  res.send(results);
};

exports.update = async(req, res) => {
  const studentId = req.params.student_id;
  const evaluationId = req.params.evaluation_id;
  const score = {
    eval_received_score: req.body.eval_received_score,
    feedback: req.body.feedback || null,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE Evaluation_Score
    SET eval_received_score = ${score.eval_received_score},
    feedback = ${score.feedback}
    WHERE student_id=${studentId} AND evaluation_id=${evaluationId}
  `);
  res.send(results);
};

exports.delete = async(req, res) => {
  const studentId = req.params.student_id;
  const evaluationId = req.params.evaluation_id;
  const [results, metadata] = await db.sequelize.query(`
    DELETE FROM Evaluation_Score 
    WHERE student_id=${studentId} AND evaluation_id=${evaluationId}
  `);
  res.send(results);
};
