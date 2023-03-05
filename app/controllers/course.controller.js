const db = require("../models");

//using
exports.findAllCourses = async (req, res) => {
  const [results, metadata] = await db.sequelize.query(`
    SELECT
        *
    FROM
        course
    GROUP BY
        course_id,
        section
  `);
  res.send(results);
};

exports.findEvalutionsBySection = async (req, res) => {
  // Validate request
  if (!req.params.course_id || !req.params.section) {
    res.status(400).send({
      message: "Please provide values for course_id and section",
    });
    return;
  }

  const pk = {
    course_id: req.params.course_id,
    section: req.params.section,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      course.course_id,
      course.section,
      course.course_name,
      evaluation.evaluation_title,
      (
          SELECT
              AVG(eval_received_score)
          FROM
              evaluation_score
          WHERE
              evaluation_score.evaluation_id = evaluation.evaluation_id
      ) AS average_score
    FROM
      evaluation
      INNER JOIN course ON evaluation.course_id = course.course_id
    WHERE
      evaluation.course_id = '${pk.course_id}'
      AND evaluation.section = ${pk.section}    
  `);
  res.send(results);
};

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.course_id || !req.body.section || !req.body.course_name) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  // Create a Course
  const course = {
    course_id: req.body.course_id,
    section: req.body.section,
    course_name: req.body.course_name,
  };

  // Save Course in the database
  const [results, metadata] = await db.sequelize.query(`
    INSERT INTO Course (course_id, "section", course_name) 
    values ('${course.course_id}', ${course.section}, '${course.course_name}')`);
  res.send(results);
};

exports.findOne = async (req, res) => {
  const student_id = req.params.student_id;
  const [results, metadata] = await db.sequelize.query(`
    SELECT * FROM Evaluation_Score NATURAL JOIN Evaluation NATURAL JOIN Course
    WHERE student_id = ${student_id}
    `);
  res.send(results);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const course = {
    course_name: req.body.course_name,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE Course
    SET course_name = '${course.course_name}'
    WHERE course_id='${id.split("_")[0]}' AND "section"='${id.split("_")[1]}'`);
  res.send(results);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const [results, metadata] = await db.sequelize.query(`
    DELETE FROM Course 
    WHERE course_id='${id.split("_")[0]}' AND "section"='${id.split("_")[1]}'`);
  res.send(results);
};
