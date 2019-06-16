var express = require("express");
var bcrypt = require("bcrypt");
var moment = require("moment");
var passport = require("passport");
var userModel = require("../../models/user.model");
var request = require("request");

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
    res.render("pieces/register", {
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

router.get("/login", (req, res, next) => {
    res.render("pieces/login", { layout: false });
});

router.post("/api/login", async(req, res, next) => {
    if (!req.body.dnusername || !req.body.dnpassword) {
        return res.json({ success: false, msg: "Missnggg" });
    }
    var dbUsername = await userModel.singleByUserName(req.body.dnusername);
    if (!dbUsername) {
        console.log("Khong co ten dang nhap trong db");
        return res.json({ success: false, msg: "Ten or MK sai" });
    }

    namedb = dbUsername[0].Username;
    passworddb = dbUsername[0].Password;
    id = dbUsername[0].User_Cat_Name;
    if (req.body.dnpassword !== passworddb) {
        console.log("Mat khau khong dung");
        return res.json({ success: false, msg: "Ten or MK sai" });
    }

    res.cookie("username", namedb);
    return res.json({ success: true, msg: "OK" });
});

router.post("/api/register", async(req, res, next) => {
    console.log(req.body);
    if (!req.body.dkusername ||
        !req.body.dkpassword ||
        !req.body.dkname ||
        !req.body.dkemail ||
        !req.body.captcha
    ) {
        console.log("missingggggggggggggggg");
        return res.json({ success: false, msg: "Sad boy" });
    } else {
        var entity = {
            Username: req.body.dkusername,
            Password: req.body.dkpassword,
            Name: req.body.dkname,
            Email: req.body.dkemail
        };
        userModel
            .add_acc(entity)
            .then(data => {
                console.log("vo dc dang ki");
                return res.json({ success: true, msg: "OK" });
            })
            .catch(err => {
                return res.json({ success: false, msg: "Sad boy" });
            });
    }
});

// router.post("/register", async(req, res, next) => {
//     console.log(req.body);
//     var name = req.body.dnusername;
//     var password = req.body.dnpassword;
//     var namedb, passworddb;
//     // var checkCaptcha = req.bode.captcha
//     // console.log('captcha: ' + captcha)

//     var recaptcha = req.body.captcha;
//     console.log("recaptcha: " + recaptcha);

//     const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=6LdwBKkUAAAAAAOwExf92QKAHkR_RIX5l519_Q-M&response=${
//     req.body.captcha
//   }&remoteip=${req.connection.remoteAddress}`;
//     console.log("verifyUrl: " + verifyUrl);
//     if (name != "" && password != "") {
//         var dbUsername = await userModel.singleByUserName(name);
//         if (
//             dbUsername === undefined ||
//             dbUsername === null ||
//             Object.keys(dbUsername).length === 0
//         ) {
//             console.log("Khong co ten dang nhap trong db");
//             res.end("Ten dang nhap hoac mat khau khong dung");
//             return;
//         }
//         namedb = dbUsername[0].Username;
//         passworddb = dbUsername[0].Password;
//         id = dbUsername[0].User_Cat_Name;
//         if (password !== passworddb) {
//             console.log("Mat khau khong dung");
//             res.end("Ten dang nhap hoac mat khau khong dung");
//             return;
//         }

//         console.log("vo duoc dang nhap");

//         res.cookie("username", namedb);
//         res.redirect("/");
//         return;
//     } else if (!req.body.captcha) {
//         console.log("capchaaaaaaaaaaaaaaaaaaaaa");
//         return res.json({ success: false, msg: "Please select captcha" });
//     } else if (
//         req.body.dkusername &&
//         req.body.dkpassword &&
//         req.body.dkpassword_confirmation &&
//         req.body.dkname &&
//         req.body.dkemail
//     ) {
//         var entity = {
//             Username: req.body.dkusername,
//             Password: req.body.dkpassword,
//             Name: req.body.dkname,
//             Email: req.body.dkemail
//         };
//         userModel
//             .add_acc(entity)
//             .then(data => {
//                 console.log("vo dc dang ki");
//                 res.redirect("/");
//             })
//             .catch(err => {
//                 throw err;
//             });
//     } else {
//         console.log("sad :(");       
//     }
// });
router.post('/logout', (req, res, next) => {
    req.logOut();
    location.reload();
    console.log('logout roi ne')
})
module.exports = router;