const db = require("../models");

exports.create = async(req, res) => {
  if (!req.body.student_id || !req.body.evaluation_id || !req.body.eval_received_score) {
    res.status(400).send({
      message: "Invalid input data!"
    });
    return;
  }

  const score = {
    student_id: req.body.student_id,
    evaluation_id: req.body.evaluation_id,
    eval_received_score: req.body.eval_received_score,
    feedback: req.body.feedback || null,
  };

  const [results, metadata] = await db.sequelize.query(`
    INSERT INTO Evaluation_Score (student_id, evaluation_id, eval_received_score, feedback) 
    VALUES (${score.student_id}, ${score.evaluation_id}, ${score.eval_received_score}, ${score.feedback})
  `);

  res.send(results);
};

//using
exports.insertFeedback = async (req, res) => {
  const { student_id, evaluation_id, feedback } = req.body;

  try {
    const queryString = `
      INSERT INTO Evaluation_Score (student_id, evaluation_id, feedback)
      VALUES (${student_id}, ${evaluation_id}, ${feedback})
    `;
    const values = [student_id, evaluation_id, null, feedback];
    const result = await db.sequelize.query(queryString, { replacements: values });
    res.status(200).send({ message: "Feedback successfully added" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding feedback" });
  }
};


//using
exports.findAll = async(req, res) => {
  const [results, metadata] = await db.sequelize.query(`SELECT * FROM Evaluation_Score WHERE student_id=`);
  res.send(results);
};

//using
exports.findOneStudent = async(req, res) => {
  const student_id = req.params.student_id;
  const evaluation_id = req.params.evaluation_id;
  const [results, metadata] = await db.sequelize.query(`
    SELECT * FROM Evaluation_Score 
    WHERE student_id=${student_id} AND evaluation_id=${evaluation_id}
  `);
  res.send(results);
};

//using
exports.getStudentTotal = async (req, res) => {
  const student_id = req.params.student_id;
  const [results, metadata] = await db.sequelize.query(`SELECT sum(eval_received_score) FROM evaluation_score NATURAL JOIN evaluation  WHERE student_id = ${student_id} GROUP BY student_id`);
  res.send(results);
};

//using
exports.getAllStudentTotal = async (req, res) => {
  const student_id = req.params.student_id;
  const [results, metadata] = await db.sequelize.query(`SELECT sum(eval_received_score) FROM evaluation_score NATURAL JOIN evaluation GROUP BY student_id`);
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
