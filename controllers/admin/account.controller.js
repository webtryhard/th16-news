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
        //alert('Tên đăng nhập hoặc mật khẩu không đúng');
        return res.json({ success: false, msg: "Ten or MK sai" });
    }

    namedb = dbUsername[0].Username;
    passworddb = dbUsername[0].Password;
    id = dbUsername[0].User_Cat_Name;
    if (req.body.dnpassword !== passworddb) {
        console.log("Mat khau khong dung");
        //alert('Tên đăng nhập hoặc mật khẩu không đúng');
        return res.json({ success: false, msg: "Ten or MK sai" });
    }

    res.cookie("username", namedb);
    res.cookie("userId", dbUsername[0].User_ID);
    res.cookie("userCatName", id)
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
            Email: req.body.dkemail,
            User_Cat_Name: 'Subcriber',
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

router.get('/search', async(req, res) => {
    let ip_search = req.query.ip_search
    if (!ip_search) {
        return
    }
    var dbSearch = await userModel.searchNewsName(ip_search);
    dbSearch = dbSearch[1]

    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 8;
    var offset = (page - 1) * limit;
    var newsList = new Array();

    var total = dbSearch.length;
        
        var npage = Math.floor(total / limit);
        if(total % limit > 0) npage++;
        var pages = [];

        var prev, next, first, last;
        if(page > 1) 
        {
            prev = page - 1;
            first = 1;
        }

        if(page < npage) 
        {
            next = +page + 1;
            last = npage;
        }

        for(i = page - 1; i <= +page + 1; i++)
        {
            if(i > 0 && i <= npage)
            {
            var obj = {value : i, active : i === +page};
            pages.push(obj);
            }
        }
        
        for (i = offset; i < offset + limit; i++) {
            if (dbSearch[i]) {
                newsList.push(dbSearch[i]);
            }
        }

    res.render('vwTag/tag', {
        menu: res.menu,
        newsList, pages, first, last, prev, next,
        layout: "TrangChu.hbs",
        style: ['style1.css', 'style2.css', 'login.css', 'signup.css', 'login-register.css'],
        js: ['jQuery.js', 'js.js', 'login-register.js'],
        logo: 'logo.png'
    })
})

// router.post("/api/search", async(req, res, next) => {
//     console.log('hello')
//     if (!req.body.ip_search) {
//         console.log('vo ham hong co')
//         return res.json({ success: false, msg: "Missnggg" });
//     }
//     var dbSearch = await userModel.searchNewsName(req.body.ip_search);
//     if (!dbSearch[1]) {
//         console.log("Khong co tu tim kiem trong db");
//         //alert('Tên đăng nhập hoặc mật khẩu không đúng');
//         return res.json({ success: false, msg: "Tim khong ra" });
//     } else {
//         console.log('co du lieu');
//     }
//     return res.json({ success: true, msg: "OK" });
// });

router.get('/thaydoithongtin', (req, res) => {
    res.render('pieces/thayDoiThongTinCaNhan', {
        layout: false
    })
});

router.post('/thaydoithongtin', async(req, res) => {
    // console.log('cookie id: ', userId)
    console.log('cookie: ', req.cookies.username)
    console.log('cookie id2: ', req.cookies.userId)
    var enUsername = req.body.udusername;
    var enPassword = req.body.udpassword;
    var enName = req.body.udname;
    var enEmail = req.body.udemail;
    var enAddress = req.body.udaddress;
    var enPhone = req.body.udphone;
    var dbUser = await userModel.singleByID(req.cookies.userId);
    console.log('dbuser: ', dbUser);
    if (enUsername === "") {
        enUsername = dbUser[0].Username;
    }
    if (enPassword === "") {
        enPassword = dbUser[0].Password;
    }
    if (enName === "") {
        enName = dbUser[0].Username;
    }
    if (enEmail === "") {
        enEmail = dbUser[0].Email;
    }
    if (enAddress === "") {
        enAddress = dbUser[0].Address;
    }
    if (enPhone === "") {
        enPhone = dbUser[0].Phone;
    }
    var entity = {
        User_ID: req.cookies.userId,
        Username: enUsername,
        Password: enPassword,
        Name: enName,
        Email: enEmail,
        Address: enAddress,
        Phone: enPhone,
    }
    userModel.updateUser(entity);
    res.clearCookie("username");
    res.cookie("username", enUsername);
    res.redirect('/');
});


router.get("/logout", (req, res) => {
    res.clearCookie("username");
    res.clearCookie("userId");
    res.clearCookie("userCatName");
    res.redirect('/');
});
module.exports = router;