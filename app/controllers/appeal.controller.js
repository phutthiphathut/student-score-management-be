const db = require("../models");

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

exports.updateStatus = async (req, res) => {
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

exports.updateRemark = async (req, res) => {
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

exports.create = async (req, res) => {
  // Validate request
  if (
    !req.body.student_id ||
    !req.body.evaluation_id ||
    !req.body.pd_id ||
    !req.body.status
  ) {
    res.status(400).send({
      message:
        "Please provide values for student_id, evaluation_id, pd_id and status",
    });
    return;
  }

  // Create an Appeal
  const appeal = {
    student_id: req.body.student_id,
    evaluation_id: req.body.evaluation_id,
    pd_id: req.body.pd_id,
    reason: req.body.reason,
  };

  // Save Appeal in the database
  const [results, metadata] = await db.sequelize
    .query(`INSERT INTO Appeal (student_id, evaluation_id, pd_id, reason, remark, status)
    VALUES (${appeal.student_id}, ${appeal.evaluation_id}, ${appeal.pd_id}, '${appeal.reason}', '${appeal.remark}', 'pending')`);

  res.send(results);
};

exports.findAll = async (req, res) => {
  const [results, metadata] = await db.sequelize.query("SELECT * FROM Appeal");
  res.send(results);
};

//using
exports.findOneStudent = async (req, res) => {
  const student_id = req.params.student_id;
  const evaluation_id = req.params.evaluation_id;
  const [results, metadata] = await db.sequelize.query(
    `SELECT * FROM Appeal WHERE student_id=${student_id} AND evaluation_id=${evaluation_id}`
  );
  res.send(results);
};

exports.update = async (req, res) => {
  const student_id = req.params.student_id;
  const evaluation_id = req.params.evaluation_id;
  const appeal = {
    pd_id: req.body.pd_id,
    reason: req.body.reason,
    remark: req.body.remark,
    status: req.body.status,
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE Appeal
    SET pd_id = ${appeal.pd_id},
    reason = '${appeal.reason}',
    remark = '${appeal.remark}',
    status = '${appeal.status}'
    WHERE student_id = ${student_id} AND evaluation_id = ${evaluation_id}
  `);

  res.send(results);
};

// exports.delete = async(req, res) => {
//   const student_id = req.params.student_id;
//   const evaluation_id = req.params.evaluation_id;
//   const [results, metadata] = await db.sequelize.query(`DELETE FROM Appeal WHERE student_id=${student_id} AND evaluation_id=${evaluation_id}`);
//   res.send(results);
// };
