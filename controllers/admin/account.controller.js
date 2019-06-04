var express = require("express");
var bcrypt = require("bcrypt");
var moment = require("moment");
var passport = require("passport");
var userModel = require("../../models/user.model");

var router = express.Router();

router.get("/is-available", (req, res, next) => {
  var user = req.query.username;
  userModel.singleByUserName(user).then(rows => {
    if (rows.length > 0) {
      return res.json(false);
    }

    return res.json(true);
  });
});

router.get("/register", (req, res, next) => {
  res.render("vwAccount/register", {
    layout: "TrangChu.hbs",
    style: [
      "style1.css",
      "style2.css",
      "login.css",
      "signup.css",
      "login-register.css"
    ],
    js: ["jQuery.js", "js.js", "login-register.js"],
    logo: "logo.png"
  });
});

router.post("/register", (req, res, next) => {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
  var dob = moment(req.body.dob, "DD/MM/YYYY").format("YYYY-MM--DD");

  var entityAcc={
    Username: req.body.username,
    Password: hash,
  };
  var entitySub = {
    Sub_Name: req.body.name,
    Sub_Email: req.body.email,
    Sub_BirthDay: dob,
    f_Permission: 0
  };

  userModel.addAcc(entityAcc).then(id => {
    res.redirect("/account/login");
  });
});

router.get("/login", (req, res, next) => {
  res.render("vwAccount/login", { layout: false });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("vwAccount/login", {
        layout: false,
        err_message: info.message
      });
    }

    req.logIn(user, err => {
      if (err) return next(err);

      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = router;
