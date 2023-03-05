const db = require("../models");

exports.create = async(req, res) => {
  // Validate request
  if (!req.body.course_id || !req.body.section || !req.body.teacher_id || !req.body.room || !req.body.day_of_week || !req.body.start_time || !req.body.end_time) {
    res.status(400).send({
      message: "All fields are required!"
    });
    return;
  }

  // Create a new Teach record
  const teach = {
    course_id: req.body.course_id,
    section: req.body.section,
    teacher_id: req.body.teacher_id,
    room: req.body.room,
    day_of_week: req.body.day_of_week,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  };

  // Save the Teach record in the database
  const [results, metadata] = await db.sequelize.query(`INSERT INTO Teach (course_id, "section", teacher_id, room, day_of_week, start_time, end_time) 
    VALUES ('${teach.course_id}', ${teach.section}, ${teach.teacher_id}, '${teach.room}', '${teach.day_of_week}', '${teach.start_time}', '${teach.end_time}')`);

  res.send(results);
};

exports.findAll = async(req, res) => {
  const [results, metadata] = await db.sequelize.query("SELECT * FROM Teach");
  res.send(results);
};

exports.findOne = async(req, res) => {
  const course_id = req.params.course_id;
  const section = req.params.section;
  const day_of_week = req.params.day_of_week;
  const [results, metadata] = await db.sequelize.query(`SELECT * FROM Teach WHERE course_id='${course_id}' AND "section"=${section} AND day_of_week='${day_of_week}'`);
  res.send(results);
};

exports.update = async(req, res) => {
  const course_id = req.params.course_id;
  const section = req.params.section;
  const day_of_week = req.params.day_of_week;
  const teach = {
    teacher_id: req.body.teacher_id,
    room: req.body.room,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  };

  const [results, metadata] = await db.sequelize.query(`
    UPDATE Teach
    SET teacher_id = ${teach.teacher_id},
    room = '${teach.room}',
    start_time = '${teach.start_time}',
    end_time = '${teach.end_time}'
    WHERE course_id = '${course_id}' AND "section" = ${section} AND day_of_week = '${day_of_week}'
  `);

  res.send(results);
};

exports.delete = async(req, res) => {
  const course_id = req.params.course_id;
  const section = req.params.section;
  const day_of_week = req.params.day_of_week;

  const [results, metadata] = await db.sequelize.query(`DELETE FROM Teach WHERE course_id='${course_id}' AND "section"=${section} AND day_of_week='${day_of_week}'`);
  res.send(results);
};
