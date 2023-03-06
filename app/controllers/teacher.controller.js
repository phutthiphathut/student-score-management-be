const db = require("../models");

exports.findAllCourses = async (req, res) => {
  // Validate request
  if (!req.params.teacher_id) {
    res.status(400).send({
      message: "Please provide values for teacher_id",
    });
    return;
  }

  const pk = {
    teacher_id: req.params.teacher_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      course.course_id,
      course.section,
      course.course_name,
      teach.start_time,
      teach.end_time,
      teach.day_of_week
    FROM
      teach
      INNER JOIN users ON teach.teacher_id = users.user_id
      INNER JOIN course ON teach.course_id = course.course_id
      AND teach.section = course.section
    WHERE
      teach.teacher_id = ${pk.teacher_id}
  `);
  res.send(results);
};

exports.findStudentsBySection = async (req, res) => {
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
      users.user_id,
      users.first_name,
      users.last_name,
      course.course_name,
      SUM(eval_received_score) AS total
    FROM
      evaluation_score
      INNER JOIN evaluation ON evaluation_score.evaluation_id = evaluation.evaluation_id
      INNER JOIN users ON evaluation_score.student_id = users.user_id
      INNER JOIN course ON evaluation.course_id = course.course_id
    WHERE
      evaluation.course_id = '${pk.course_id}'
      AND evaluation.section = ${pk.section}
    GROUP BY
      users.user_id,
      course.course_name
  `);
  res.send(results);
};

exports.findStudentScoresBySection = async (req, res) => {
  // Validate request
  if (!req.params.course_id || !req.params.section || !req.params.student_id) {
    res.status(400).send({
      message: "Please provide values for course_id, section and student_id",
    });
    return;
  }

  const pk = {
    course_id: req.params.course_id,
    section: req.params.section,
    student_id: req.params.student_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      users.user_id,
      users.first_name,
      users.last_name,
      course.course_name,
      evaluation.evaluation_id,
      evaluation.evaluation_title,
      evaluation.full_score,
      evaluation_score.eval_received_score
    FROM
      evaluation_score
      INNER JOIN evaluation ON evaluation_score.evaluation_id = evaluation.evaluation_id
      INNER JOIN users ON evaluation_score.student_id = users.user_id
      INNER JOIN course ON evaluation.course_id = course.course_id
    WHERE
      evaluation.course_id = '${pk.course_id}'
      AND evaluation.section = ${pk.section}
      AND evaluation_score.student_id = ${pk.student_id}
  `);
  res.send(results);
};

exports.findUnregisteredStudentsBySection = async (req, res) => {
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
      user_id,
      first_name,
      last_name,
      (SELECT course_name FROM course WHERE course_id = '${pk.course_id}')
    FROM
      users
    WHERE
      user_id NOT IN(
          SELECT
              users.user_id
          FROM
              evaluation_score
              INNER JOIN evaluation ON evaluation_score.evaluation_id = evaluation.evaluation_id
              INNER JOIN users ON evaluation_score.student_id = users.user_id
              INNER JOIN course ON evaluation.course_id = course.course_id
          WHERE
              evaluation.course_id = '${pk.course_id}'
              AND evaluation.section = ${pk.section}
          GROUP BY
              users.user_id
      ) AND
      role = 'student'
  `);
  res.send(results);
};

exports.findEvalutaionFeedback = async (req, res) => {
  // Validate request
  if (!req.params.evaluation_id || !req.params.student_id) {
    res.status(400).send({
      message: "Please provide values for evaluation_id and student_id",
    });
    return;
  }

  const pk = {
    evaluation_id: req.params.evaluation_id,
    student_id: req.params.student_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      evaluation_score.feedback,
      evaluation.evaluation_title
    FROM
      evaluation_score
      INNER JOIN evaluation ON evaluation_score.evaluation_id = evaluation.evaluation_id
    WHERE
      evaluation_score.student_id = ${pk.student_id}
      AND evaluation_score.evaluation_id = ${pk.evaluation_id}
  `);
  if (results.length) {
    res.send(results[0]);
  } else {
    res.status(404).send();
  }
};

exports.updateEvalutaionFeedback = async (req, res) => {
  // Validate request
  if (!req.params.evaluation_id || !req.params.student_id) {
    res.status(400).send({
      message: "Please provide values for evaluation_id and student_id",
    });
    return;
  }
  if (!req.body.feedback) {
    res.status(400).send({
      message: "Please provide values for feedback",
    });
    return;
  }

  const pk = {
    evaluation_id: req.params.evaluation_id,
    student_id: req.params.student_id,
  };

  const evalutaion = {
    feedback: req.body.feedback,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE
      evaluation_score
    SET
      feedback = '${evalutaion.feedback}'
    WHERE
      evaluation_id = ${pk.evaluation_id}
      AND student_id = ${pk.student_id}
  `);

  res.send(results);
};

exports.updateEvalutaionScore = async (req, res) => {
  // Validate request
  if (!req.params.evaluation_id || !req.params.student_id) {
    res.status(400).send({
      message: "Please provide values for evaluation_id and student_id",
    });
    return;
  }
  if (!req.body.score) {
    res.status(400).send({
      message: "Please provide values for score",
    });
    return;
  }

  const pk = {
    evaluation_id: req.params.evaluation_id,
    student_id: req.params.student_id,
  };

  const evalutaion = {
    score: req.body.score,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE
      evaluation_score
    SET
    eval_received_score = ${evalutaion.score}
    WHERE
      evaluation_id = ${pk.evaluation_id}
      AND student_id = ${pk.student_id}
  `);

  res.send(results);
};

exports.addStudentToSection = async (req, res) => {
  // Validate request
  if (!req.params.course_id || !req.params.section || !req.body.student_id) {
    res.status(400).send({
      message: "Please provide values for course_id, section and student_id",
    });
    return;
  }

  const pk = {
    course_id: req.params.course_id,
    section: req.params.section,
    student_id: req.body.student_id,
  };

  const [evaluations, metadata1] = await db.sequelize.query(`
    SELECT
      evaluation_id AS id
    FROM
      evaluation
      INNER JOIN course ON evaluation.course_id = course.course_id
    WHERE
      evaluation.course_id = '${pk.course_id}'
      AND evaluation.section = ${pk.section}
  `);

  if (evaluations.length) {
    const values = evaluations
      .map((evaluation) => `(${pk.student_id}, ${evaluation.id}, 0)`)
      .join(", ");

    const [results, metadata2] = await db.sequelize.query(`
      INSERT INTO
        evaluation_score(student_id, evaluation_id, eval_received_score)
      VALUES ${values}
    `);
    res.send(results);
  }
  res.send();
};

exports.removeStudentFromSection = async (req, res) => {
  // Validate request
  if (!req.params.course_id || !req.params.section || !req.body.student_id) {
    res.status(400).send({
      message: "Please provide values for course_id, section and student_id",
    });
    return;
  }

  const pk = {
    course_id: req.params.course_id,
    section: req.params.section,
    student_id: req.body.student_id,
  };

  const [evaluations, metadata1] = await db.sequelize.query(`
    SELECT
      evaluation_id AS id
    FROM
      evaluation
      INNER JOIN course ON evaluation.course_id = course.course_id
    WHERE
      evaluation.course_id = '${pk.course_id}'
      AND evaluation.section = ${pk.section}
  `);

  if (evaluations.length) {
    const values = evaluations.map((evaluation) => evaluation.id).join(", ");

    const [results, metadata2] = await db.sequelize.query(`
      DELETE FROM
          evaluation_score
      WHERE
          student_id = ${pk.student_id}
          AND evaluation_id IN (${values});
    `);
    res.send(results);
  }
  res.send();
};
