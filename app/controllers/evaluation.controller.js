const db = require("../models");

exports.create = async(req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create an Evaluation
    const evaluation = {
      evaluation_title: req.body.evaluation_title,
      full_score: req.body.full_score,
      course_id: req.body.course_id,
      section: req.body.section
    };
  
    // Save Evaluation in the database
    const [results, metadata] = await db.sequelize.query(`
    INSERT INTO Evaluation (evaluation_title, full_score, course_id, "section")
    VALUES ('${evaluation.evaluation_title}', ${evaluation.full_score}, '${evaluation.course_id}', ${evaluation.section})`);

    res.send(results);
};

exports.findAll = async(req, res) => {
    const [results, metadata] = await db.sequelize.query("SELECT * FROM Evaluation");
    res.send(results);
};

exports.findOne = async(req, res) => {
    const id = req.params.id;
    const [results, metadata] = await db.sequelize.query(`SELECT * FROM Evaluation WHERE evaluation_id=${id}`);
    res.send(results);
};

exports.update = async(req, res) => {
    const id = req.params.id;
    const evaluation = {
      evaluation_title: req.body.evaluation_title,
      full_score: req.body.full_score,
      course_id: req.body.course_id,
      section: req.body.section
    };
    
    const [results, metadata] = await db.sequelize.query(`
    UPDATE Evaluation
    SET evaluation_title = '${evaluation.evaluation_title}',
        full_score = ${evaluation.full_score},
        course_id = '${evaluation.course_id}',
        "section" = ${evaluation.section}
    WHERE evaluation_id = ${id}`
    );
    res.send(results);
};

exports.delete = async(req, res) => {
    const id = req.params.id;
    const [results, metadata] = await db.sequelize.query(`DELETE FROM Evaluation WHERE evaluation_id=${id}`);
    res.send(results);
};
