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
                    notices: "Email chua duoc dang ki"
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
                                user: 'viettham1998@gmail.com',
                                pass: '0972371457'
                            }
                        });
                        console.log('3333')
                        console.log('token: ' + token);
                        var mailOptions = {
                            to: userMail,
                            from: `"16TH_News" <viettham1998@gmail.com>`,
                            subject: '16TH_News | Đặt lại mật khẩu',
                            text: 'Bạn nhận được email này vì quên mật khẩu đăng nhập ứng dụng.\n\n' +
                                'Nhấn vào link sau đây hoặc mở nó trong trình duyệt của bạn để đặt lại mật khẩu:\n\n' +
                                'http://localhost:3000/password/thaydoimatkhau/' + token + '\n\n' +
                                'Nếu không phải bạn, vui lòng bỏ qua email này.\n'
                        };
                        transporter.sendMail(mailOptions, function(err) {});

                        console.log('gui mail reset done: ', userMail);
                        // console.log('mail: ', process.env.EMAIL_SENDER);
                        res.render('pieces/quenMatKhau', {
                            layout: false,
                            notices: ["Một email xác nhận đã được gửi vào mail cá nhân của bạn, hãy kiểm tra mail nhé!"]
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

router.get('/thaydoimatkhau/:token', (req, res) => {
    if (!req.params.token) {
        res.redirect('/')
        return
    }

    let checkToken = userModel.checkToken(req.params.token)

    checkToken
        .then(user => {
            if (user.rowCount == 0) {
                res.redirect('/')
                return
            }

            res.render('/pieces/datLaiMatKhau', {
                layout: false
            })
        })
        .catch(err => {
            throw err
        })

}, )

router.post('/thaydoimatkhau', (req, res) => {
    async.waterfall([
        function(done) {
            let checkToken = userModel.checkToken(req.params.token)

            checkToken
                .then(user => {
                    var userMail = user.rows[0].email

                    let entity = {
                        User_ID: user.rows[0].id,
                        Password: bcrypt.hashSync(req.body.password, saltRounds),
                        token: null
                    }

                    let changePass = userModel.updateEmail(entity)

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
                    user: 'viettham1998@gmail.com',
                    pass: '0972371457'
                }
            });

            var mailOptions = {
                to: userMail,
                from: `"16TH_News" <viettham1998@gmail.com>`,
                subject: '16TH_News | Thay đổi mật khẩu thành công',
                text: 'Chào bạn,\n\n' +
                    'Email này gửi đến bạn để xác nhận tài khoản ' + userMail + ' đã được thay đổi mật khẩu.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                done(err);
            });

            res.render('pieces/quenMatKhau', {
                layout: false,
                notices: ['Đặt mật khẩu thành công.']
            });
        }
    ], function(err) {});
})

module.exports = router;