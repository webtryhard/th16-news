var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model')
var crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');
router.get('/quenmatkhau', (req, res) => {
    res.render('pieces/quenMatKhau', {
        layout: false
    })
})

router.post('/quenmatkhau', (req, res) => {
    let email = req.body.email
    console.log('email: ' + email)
    var entity = {
        Email: email,
        token: '123',
    }
    var checkEmail = userModel.updateEmail(entity);
    // console.log(checkEmail)
    checkEmail
        .then(users => {
            if (users.length == 0) {
                res.render("pieces/quenmatkhau", {
                    layout: false,
                    notices: "Ð?a ch? mail chua du?c dang kí. Ðang kí ngay!"
                });
            } else {
                // gui mail

                let userMail = req.body.email;
                console.log('vao ham else roi ne, ahihi', userMail)

                async.waterfall([
                    function(done) {
                        crypto.randomBytes(10, function(err, buf) {
                            var token = buf.toString('hex');
                            done(err, token);
                        });
                    },
                    function(token, done) {
                        let entity = {
                            Email: email,
                            token: token,
                        };

                        let changeToken = userModel.updateEmail(entity)

                        changeToken
                            .then(data => {
                                console.log('222')
                                done(null, token)
                            })
                            .catch(err => {
                                throw err
                            })

                        // user.save(function (err) {
                        //   done(err, token, user);
                        // });
                    },
                    function(token) {
                        var transporter = nodemailer.createTransport({
                            service: "Gmail",
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user: process.env.EMAIL_SENDER,
                                pass: process.env.EMAIL_PASS
                            }
                        });
                        console.log('3333')

                        var mailOptions = {
                            to: userMail,
                            from: `"16TH - NEWS" <${process.env.EMAIL_SENDER}>`,
                            subject: '16TH_News | Password Reset',
                            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                'http://localhost:3000/datlaimatkhau/' + token + '\n\n' +
                                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        };
                        transporter.sendMail(mailOptions, function(err) {});

                        console.log('gui mail reset done: ', userMail);
                        res.render('pieces/quenMatKhau', {
                            layout: false,
                            notices: ["M?t mail xác nh?n dã du?c g?i vào h?p thu c?a b?n. Ki?m tra ngay!"]
                        });
                    }
                ], function(err, result) {
                    if (err) throw err;
                });
            }

            // res.redirect("/auth/login");
        })
        .catch(err => {
            throw err
        });

})

router.get('/thaydoimatkhau', (req, res) => {
    async.waterfall([
        function(done) {
            let checkToken = authModel.checkToken(req.params.token)

            checkToken
                .then(user => {
                    var userMail = user.rows[0].email

                    let entity = {
                        User_ID: user.rows[0].id,
                        Password: bcrypt.hashSync(req.body.password, saltRounds),
                        token: null
                    }

                    let changePass = authModel.update(entity)

                    changePass
                        .then(data => {
                            done(null, userMail)
                        })
                        .catch(err => {
                            throw err
                        })
                })
                .catch(err => {
                    throw err
                })
        },
        function(userMail, done) {
            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_SENDER,
                    pass: process.env.EMAIL_PASS
                }
            });

            var mailOptions = {
                to: userMail,
                from: `"Salad News" <${process.env.EMAIL_SENDER}>`,
                subject: 'SaladNews | Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + userMail + ' at Salad News has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                done(err);
            });

            res.render('pieces/quenMatKhau', {
                layout: false,
                notices: ['B?n dã d?i m?t kh?u thành công.']
            });
        }
    ], function(err) {});
})

router.post('/thaydoimatkhau', (req, res) => {
    async.waterfall([
        function(done) {
            let checkToken = authModel.checkToken(req.params.token)

            checkToken
                .then(user => {
                    var userMail = user.rows[0].email

                    let entity = {
                        User_ID: user.rows[0].id,
                        Password: bcrypt.hashSync(req.body.password, saltRounds),
                        token: null
                    }

                    let changePass = authModel.update(entity)

                    changePass
                        .then(data => {
                            done(null, userMail)
                        })
                        .catch(err => {
                            throw err
                        })
                })
                .catch(err => {
                    throw err
                })
        },
        function(userMail, done) {
            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_SENDER,
                    pass: process.env.EMAIL_PASS
                }
            });

            var mailOptions = {
                to: userMail,
                from: `"Salad News" <${process.env.EMAIL_SENDER}>`,
                subject: 'SaladNews | Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + userMail + ' at Salad News has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                done(err);
            });

            res.render('pieces/quenMatKhau', {
                layout: false,
                notices: ['B?n dã d?i m?t kh?u thành công.']
            });
        }
    ], function(err) {});
})

module.exports = router;