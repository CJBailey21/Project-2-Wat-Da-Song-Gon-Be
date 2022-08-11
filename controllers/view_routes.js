const view_router = require("express").Router();
const { isLoggedOut, isLoggedIn } = require("./helpers");
const User = require("../models/User");
const Post = require("../models/Post");

view_router.get("/", isLoggedIn, async (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    let user = await User.findByPk(user_id, {
      include: Post,
    });
    console.log(user);
    user = {
      id: user.id,
      username: user.username,
      posts: user.posts.map((post) => {
        return {
          id: post.id,
          post: post.post,
        };
      }),
    };
    return res.render('index', {user, redirect_uri: process.env.NODE_ENV === 'production' ? 'https://infinite-coast-04831.herokuapp.com/' : "http://127.0.0.1:5500"})
  }
  res.render("index");
});

//if (!req.session.user_id)
view_router.get("/spotauth", isLoggedOut, (req, res) => {
  const user_id = req.session.user_id;

  if (user_id) {
    return User.findOne({
      where: {
        id: user_id,
      },
      attributes: ["id", "username"],
    }).then((user) => {
      user = {
        username: user.username,
      };
      res.render("spotauth", { user });
    });
  }
});

view_router.get("/home", isLoggedOut, (req, res) => {
  const user_id = req.session.user_id;

  if (user_id) {
    return User.findOne({
      where: {
        id: user_id,
      },
      attributes: ["id", "username"],
    }).then((user) => {
      user = {
        username: user.username,
      };
      res.render("home", { user });
    });
  }
});

view_router.get("/index", isLoggedOut, (req, res) => {
  res.render("index", { errors: req.session.errors });
});
view_router.get("/login", isLoggedIn, (req, res) => {
  res.render("login", { errors: req.session.errors });
});
view_router.get("/register", isLoggedIn, (req, res) => {
  res.render("register", { errors: req.session.errors });
});

module.exports = view_router;
