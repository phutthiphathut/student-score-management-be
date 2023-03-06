const db = require("../models");

exports.findAllCourses = async (req, res) => {
  // Validate request
  if (!req.params.student_id) {
    res.status(400).send({
      message: "Please provide values for student_id",
    });
    return;
  }

  const pk = {
    student_id: req.params.student_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      course.course_id,
      course.section,
      course.course_name,
      SUM(eval_received_score) AS total
    FROM
      evaluation_score
      INNER JOIN evaluation ON evaluation_score.evaluation_id = evaluation.evaluation_id
      INNER JOIN course ON evaluation.course_id = course.course_id
      AND evaluation.section = course.section
    WHERE
      evaluation_score.student_id = ${pk.student_id}
    GROUP BY
      evaluation_score.student_id,
      course.course_id,
      course.section,
      course.course_name
    `);
  res.send(results);
};

exports.findAppealsByStudent = async (req, res) => {
  // Validate request
  if (!req.params.student_id) {
    res.status(400).send({
      message: "Please provide values for student_id",
    });
    return;
  }

  const pk = {
    student_id: req.params.student_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      appeal.student_id,
      appeal.evaluation_id,
      appeal.status,
      evaluation.course_id,
      evaluation.evaluation_title,
      evaluation.full_score,
      evaluation_score.eval_received_score
    FROM
      appeal
      INNER JOIN evaluation ON appeal.evaluation_id = evaluation.evaluation_id
      INNER JOIN evaluation_score ON appeal.student_id = evaluation_score.student_id
      AND appeal.evaluation_id = evaluation_score.evaluation_id
    WHERE
      appeal.student_id = ${pk.student_id}
  `);
  res.send(results);
};

exports.findOneAppealByPk = async (req, res) => {
  // Validate request
  if (!req.params.student_id || !req.params.evaluation_id) {
    res.status(400).send({
      message: "Please provide values for student_id and evaluation_id",
    });
    return;
  }

  const pk = {
    student_id: req.params.student_id,
    evaluation_id: req.params.evaluation_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
      appeal.remark,
      evaluation.evaluation_title,
      evaluation.full_score,
      evaluation_score.eval_received_score
    FROM
      appeal
      INNER JOIN evaluation ON appeal.evaluation_id = evaluation.evaluation_id
      INNER JOIN evaluation_score ON appeal.student_id = evaluation_score.student_id
      AND appeal.evaluation_id = evaluation_score.evaluation_id
    WHERE
      appeal.student_id = ${pk.student_id}
      AND appeal.evaluation_id = ${pk.evaluation_id}
  `);
  if (results.length) {
    res.send(results[0]);
  } else {
    res.status(404).send();
  }
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
      course.course_name,
      evaluation.evaluation_id,
      evaluation.evaluation_title,
      evaluation.full_score,
      evaluation_score.eval_received_score
    FROM
      evaluation_score
      INNER JOIN evaluation ON evaluation_score.evaluation_id = evaluation.evaluation_id
      INNER JOIN course ON evaluation.course_id = course.course_id
    WHERE
      evaluation.course_id = '${pk.course_id}'
      AND evaluation.section = ${pk.section}
      AND evaluation_score.student_id = ${pk.student_id}
  `);
  res.send(results);
};

exports.findOneEvaluation = async (req, res) => {
  // Validate request
  if (!req.params.evaluation_id) {
    res.status(400).send({
      message: "Please provide values for evaluation_id",
    });
    return;
  }

  const pk = {
    evaluation_id: req.params.evaluation_id,
  };

  const [results, metadata] = await db.sequelize.query(`
    SELECT
        *
    FROM
        evaluation
    WHERE 
        evaluation_id = ${pk.evaluation_id}
  `);
  if (results.length) {
    res.send(results[0]);
  } else {
    res.status(404).send();
  }
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
      evaluation_score.eval_received_score,
      evaluation.evaluation_title,
      evaluation.full_score
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

exports.findEvaluationAppeal = async (req, res) => {
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
      appeal.reason
    FROM
      appeal
      INNER JOIN evaluation ON appeal.evaluation_id = evaluation.evaluation_id
    WHERE
      appeal.student_id = ${pk.student_id}
      AND appeal.evaluation_id = ${pk.evaluation_id}
  `);
  if (results.length) {
    res.send(results[0]);
  } else {
    res.status(404).send();
  }
};

exports.createAppeal = async (req, res) => {
  // Validate request
  if (!req.params.student_id || !req.params.evaluation_id) {
    res.status(400).send({
      message: "Please provide values for student_id and evaluation_id",
    });
    return;
  }
  if (!req.body.reason) {
    res.status(400).send({
      message: "Please provide values for reason",
    });
    return;
  }

  const appeal = {
    student_id: req.params.student_id,
    evaluation_id: req.params.evaluation_id,
    reason: req.body.reason,
    status: "Pending",
  };

  const [results, metadata] = await db.sequelize.query(`
    INSERT INTO
      appeal (student_id, evaluation_id, reason, status)
    VALUES
      (${appeal.student_id}, ${appeal.evaluation_id}, '${appeal.reason}', '${appeal.status}')
  `);

  res.send(results);
};

exports.updateAppealReason = async (req, res) => {
  // Validate request
  if (!req.params.student_id || !req.params.evaluation_id) {
    res.status(400).send({
      message: "Please provide values for student_id and evaluation_id",
    });
    return;
  }
  if (!req.body.reason) {
    res.status(400).send({
      message: "Please provide values for reason",
    });
    return;
  }

  const pk = {
    student_id: req.params.student_id,
    evaluation_id: req.params.evaluation_id,
  };

  const appeal = {
    reason: req.body.reason,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE
      appeal
    SET
      reason = '${appeal.reason}'
    WHERE
      student_id = ${pk.student_id}
      AND evaluation_id = ${pk.evaluation_id}
  `);

  res.send(results);
};
