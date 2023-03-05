const db = require("../models");

exports.create = async(req, res) => {
  // Validate request
  if (!req.body.student_id || !req.body.evaluation_id || !req.body.pd_id || !req.body.status) {
    res.status(400).send({
      message: "Please provide values for student_id, evaluation_id, pd_id and status"
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
  const [results, metadata] = await db.sequelize.query(`INSERT INTO Appeal (student_id, evaluation_id, pd_id, reason, remark, status)
    VALUES (${appeal.student_id}, ${appeal.evaluation_id}, ${appeal.pd_id}, '${appeal.reason}', '${appeal.remark}', 'pending')`);

  res.send(results);
};

exports.findAll = async(req, res) => {
  const [results, metadata] = await db.sequelize.query("SELECT * FROM Appeal");
  res.send(results);
};

//using
exports.findOneStudent = async(req, res) => {
  const student_id = req.params.student_id;
  const evaluation_id = req.params.evaluation_id;
  const [results, metadata] = await db.sequelize.query(`SELECT * FROM Appeal WHERE student_id=${student_id} AND evaluation_id=${evaluation_id}`);
  res.send(results);
};

exports.update = async(req, res) => {
  const student_id = req.params.student_id;
  const evaluation_id = req.params.evaluation_id;
  const appeal = {
    pd_id: req.body.pd_id,
    reason: req.body.reason,
    remark: req.body.remark,
    status: req.body.status
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

exports.delete = async(req, res) => {
  const student_id = req.params.student_id;
  const evaluation_id = req.params.evaluation_id;
  const [results, metadata] = await db.sequelize.query(`DELETE FROM Appeal WHERE student_id=${student_id} AND evaluation_id=${evaluation_id}`);
  res.send(results);
};
