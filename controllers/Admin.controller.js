var express = require('express');
var router = express.Router();
var AdminModel = require('../models/admin.model');

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
        res.render('vwAdmin/QuanLyChuyenMuc/adminQuanLyChuyenMuc.hbs', {
            cat: rows,
            layout: 'adminQuanLyChuyenMuc.hbs',
            title: 'Quản lý chuyên mục',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/quanlychuyenmuc/deleted', (req, res) => {
    var p = AdminModel.getAllCatDeleted();
    p.then(rows => {
        res.render('vwAdmin/QuanLyChuyenMuc/deleted.hbs', {
            cat: rows,
            layout: 'adminQuanLyChuyenMuc.hbs',
            title: 'Các chuyên mục đã xóa',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/quanlychuyenmuc/delete/:id', (req, res) => {
    var id = req.params.id;
    var entity = {
        CatID: id,
        Deleted: 1
    }
    AdminModel.update(entity).then(n => {
        res.redirect('/admin/quanlychuyenmuc');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.post('/quanlychuyenmuc/restore',(req,res)=>{
    var entity={
        CatID:req.body.CatID,
        CatName:req.body.CatName,
        Parent_ID:req.body.Parent_ID,
        Deleted:req.body.Deleted
    }
    AdminModel.update(entity).then(n=>{
        res.redirect('/admin/quanlychuyenmuc');
    }).catch(err=>{
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlychuyenmuc/edit/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.singleCat(id);
    var p2 = AdminModel.getAllParentCat();

    Promise.all([p, p2]).then(([rows, rows2]) => {
        console.log(rows[0]);
        if (rows.length > 0) {
            if (rows[0].Parent_ID == null) {
                res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                    cat: rows[0],
                    parentCat: rows2,
                    error: false,
                    layout: 'adminQuanLyChuyenMuc.hbs',
                    title: 'Chỉnh sửa chuyên mục',
                    logo: 'logo.png',
                    isNull: true
                });
            } else {
                res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                    cat: rows[0],
                    parentCat: rows2,
                    error: false,
                    layout: 'adminQuanLyChuyenMuc.hbs',
                    title: 'Quản lý chuyên mục',
                    logo: 'logo.png',
                    isNull: false
                });
            }
           
        }
        else {
            res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                cat: rows[0],
                parentCat: rows2,
                error: true,
                layout: 'adminQuanLyChuyenMuc.hbs',
                title: 'Quản lý chuyên mục',
                logo: 'logo.png'
            });
        }
    }).catch(err => {
        console.log(err);
    });

})

router.post('/quanlychuyenmuc/update',(req,res)=>{
    AdminModel.update(req.body).then(n=>{
        res.redirect('/admin/quanlychuyenmuc');
    }).catch(err=>{
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlychuyenmuc/add', (req, res) => {
    var p = AdminModel.getAllParentCat();
    p.then(rows => {
        console.log(rows);
        res.render('vwAdmin/QuanLyChuyenMuc/add', {
            parentCat: rows,
            layout: 'adminQuanLyChuyenMuc.hbs',
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
            res.render('vwAdmin/QuanLyChuyenMuc/add', {
                layout: 'adminQuanLyChuyenMuc.hbs',
                title: 'Thêm chuyên mục',
            });
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/quanlychuyenmuc/restore/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.singleCat(id);
    var p2 = AdminModel.getAllParentCat();

    Promise.all([p, p2]).then(([rows, rows2]) => {
        console.log(rows[0]);
        if (rows.length > 0) {
            if (rows[0].Parent_ID == null) {
                res.render('vwAdmin/QuanLyChuyenMuc/restore', {
                    cat: rows[0],
                    parentCat: rows2,
                    error: false,
                    layout: 'adminQuanLyChuyenMuc.hbs',
                    title: 'Quản lý chuyên mục',
                    logo: 'logo.png',
                    isNull: true
                });
            } else {
                res.render('vwAdmin/QuanLyChuyenMuc/restore', {
                    cat: rows[0],
                    parentCat: rows2,
                    error: false,
                    layout: 'adminQuanLyChuyenMuc.hbs',
                    title: 'Quản lý chuyên mục',
                    logo: 'logo.png',
                    isNull: false
                });
            }
           
        }
        else {
            res.render('vwAdmin/QuanLyChuyenMuc/restore', {
                cat: rows[0],
                parentCat: rows2,
                error: true,
                layout: 'adminQuanLyChuyenMuc.hbs',
                title: 'Quản lý chuyên mục',
                logo: 'logo.png'
            });
        }
    }).catch(err => {
        console.log(err);
    });

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