const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to student score management website." });
});

// set port, listen for requests
require("./app/routes/pd.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/teacher.routes")(app);
require("./app/routes/users.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  const db = require("./app/models");
  db.sequelize
    .sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
});
