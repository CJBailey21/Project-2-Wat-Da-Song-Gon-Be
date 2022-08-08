const express = require("express");
// const session = require("express-session");
const { engine } = require("express-handlebars");
const bcrypt = require("bcrypt"); // Place into User.js
const path = require("path");
// const { Sequelize } = require("sequelize");
const PORT = process.env.PORT || 3243; // Placeholder port
require("dotenv").config();
const connection = require("./config/connection");
// const controllers = require("./controllers/index");
const app = express();
// const User = require("./models/User");


app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static(path.join("front")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./controllers'))
// app.use("/api", controllers);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/layouts/main.hbs"));
  console.log(`Listening in on main.hbs.`)
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// async function pending() {
//   const users = await User.findAll();
//   console.log(users)
// };
// pending();
// pending().then(value => console.log(value));

connection.sync({force: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
