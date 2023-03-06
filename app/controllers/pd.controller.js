const db = require("../models");

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

exports.findStudentScoresBySection = async (req, res) => {
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
      course.course_id,
      course.section,
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
      course.course_id,
      course.section,
      course.course_name
  `);
  res.send(results);
};

exports.findAllAppeals = async (req, res) => {
  const [results, metadata] = await db.sequelize.query(`
    SELECT
      appeal.student_id,
      appeal.evaluation_id,
      evaluation.course_id,
      evaluation.evaluation_title,
      appeal.status
    FROM
        appeal
        INNER JOIN users ON appeal.student_id = users.user_id
        INNER JOIN evaluation ON appeal.evaluation_id = evaluation.evaluation_id
  `);
  res.send(results);
};

exports.findOneByPK = async (req, res) => {
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
      appeal.student_id,
      appeal.evaluation_id,
      appeal.reason,
      appeal.remark,
      course.course_id,
      course.course_name,
      evaluation.evaluation_title,
      evaluation.full_score,
      evaluation_score.eval_received_score
    FROM
      appeal
      INNER JOIN users ON appeal.student_id = users.user_id
      INNER JOIN evaluation ON appeal.evaluation_id = evaluation.evaluation_id
      INNER JOIN course ON evaluation.course_id = course.course_id
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

exports.updateAppealStatus = async (req, res) => {
  // Validate request
  if (!req.params.student_id || !req.params.evaluation_id) {
    res.status(400).send({
      message: "Please provide values for student_id and evaluation_id",
    });
    return;
  }
  if (!req.body.pd_id || !req.body.status) {
    res.status(400).send({
      message: "Please provide values for pd_id and status",
    });
    return;
  }

  const pk = {
    student_id: req.params.student_id,
    evaluation_id: req.params.evaluation_id,
  };

  const appeal = {
    pd_id: req.body.pd_id,
    status: req.body.status,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE
      appeal
    SET
      pd_id = ${appeal.pd_id},
      status = '${appeal.status}'
    WHERE
      student_id = ${pk.student_id}
      AND evaluation_id = ${pk.evaluation_id}
  `);

  res.send(results);
};

exports.updateAppealRemark = async (req, res) => {
  // Validate request
  if (!req.params.student_id || !req.params.evaluation_id) {
    res.status(400).send({
      message: "Please provide values for student_id and evaluation_id",
    });
    return;
  }
  if (!req.body.pd_id) {
    res.status(400).send({
      message: "Please provide values for pd_id",
    });
    return;
  }

  const pk = {
    student_id: req.params.student_id,
    evaluation_id: req.params.evaluation_id,
  };

  const appeal = {
    pd_id: req.body.pd_id,
    remark: req.body.remark,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE
      appeal
    SET
      pd_id = ${appeal.pd_id},
      remark = '${appeal.remark}'
    WHERE
      student_id = ${pk.student_id}
      AND evaluation_id = ${pk.evaluation_id}
  `);

  res.send(results);
};
