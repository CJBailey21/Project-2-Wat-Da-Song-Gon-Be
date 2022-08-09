const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const path = require("path");
const connection = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 4545; // Placeholder port
require("dotenv").config();
const app = express();
const { view_router, user_router, auth_router } = require('./controllers')

app.use(express.static(path.join("front")));
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({ db: connection }),
  saveUninitialized: true,
  resave: false,
  cookie: {
  }
  })
);

// async function pending() {
//   const users = await User.findAll();
//   console.log(users)
// };
// pending();
// pending().then(value => console.log(value));

app.use(require('./controllers'))

connection.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
