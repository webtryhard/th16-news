var express = require('express');
var router = express.Router();
var AdminModel = require('../models/Admin.model');

router.get('/', (req, res) => {

    //console.log(rows);
    res.render('vwAdmin/administrator.hbs', {
        layout: 'Admin.hbs',
        title: 'Admin',
        logo: 'logo.png'
    });
}
)

router.get('/quanlychuyenmuc', (req, res) => {
    var p = AdminModel.getAllCat();
    p.then(rows => {
        console.log(rows);
        res.render('vwAdmin/QuanLyChuyenMuc/AdminQuanLyChuyenMuc.hbs', {
            cat: rows,
            layout: 'Admin.hbs',
            title: 'Quản lý chuyên mục',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/quanlychuyenmuc/add', (req, res) => {
    var p = AdminModel.getAllParentCat();
    p.then(rows => {
        console.log(rows);
        res.render('vwAdmin/QuanLyChuyenMuc/Add', {
            parentCat: rows,
            layout: 'Admin.hbs',
            title: 'Thêm chuyên mục',
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/quanlychuyenmuc/add', (req, res) => {
    AdminModel.add(req.body)
        .then(id => {
            console.log(id);
            res.render('vwAdmin/QuanLyChuyenMuc/Add', {
                layout: 'Admin.hbs',
                title: 'Thêm chuyên mục',
            });
        })
        .catch(err => {
            console.log(err);
        })
})


router.get('/quanlynhan', (req, res) => {

    //console.log(rows);
    res.render('vwAdmin/AdminQuanLyNhan.hbs', {
        layout: 'Admin.hbs',
        title: 'Quản lý nhãn',
        logo: 'logo.png'
    });
}
)

router.get('/quanlybaiviet', (req, res) => {

    //console.log(rows);
    res.render('vwAdmin/AdminQuanLyBaiViet.hbs', {
        layout: 'Admin.hbs',
        title: 'Quản lý bài viết',
        logo: 'logo.png'
    });
}
)

router.get('/quanlynguoidung', (req, res) => {

    //console.log(rows);
    res.render('vwAdmin/AdminQuanLyNguoiDung.hbs', {
        layout: 'Admin.hbs',
        title: 'Admin',
        logo: 'logo.png'
    });
}
)

module.exports = router;