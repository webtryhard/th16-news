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

//QUẢN LÝ CHUYÊN MỤC
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

router.get('/quanlychuyenmuc/restore/:id', (req, res) => {
    var id = req.params.id;
    var entity = {
        CatID: id,
        Deleted: 0
    }
    AdminModel.update(entity).then(n => {
        res.redirect('/admin/quanlychuyenmuc');
    }).catch(err => {
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

router.post('/quanlychuyenmuc/update', (req, res) => {
    AdminModel.update(req.body).then(n => {
        res.redirect('/admin/quanlychuyenmuc');
    }).catch(err => {
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


//QUẢN LÝ NHÃN
router.get('/quanlynhan', (req, res) => {

    var p = AdminModel.getAllTag();
    p.then(rows => {
        res.render('vwAdmin/QuanLyNhan/adminQuanLyNhan.hbs', {
            tag: rows,
            layout: 'adminQuanLyNhan.hbs',
            title: 'Quản lý nhãn',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
}
)
router.get('/quanlynhan/add', (req, res) => {

    res.render('vwAdmin/QuanLyNhan/add', {
        layout: 'adminQuanLyNhan.hbs',
        title: 'Thêm nhãn',
    });

})

router.post('/quanlynhan/add', (req, res) => {
    AdminModel.add(req.body)
        .then(id => {
            console.log(id);
            res.render('vwAdmin/QuanLyNhan/add', {
                layout: 'adminQuanLyNhan.hbs',
                title: 'Thêm nhãn',
            });
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/quanlynhan/edit/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.singleTag(id);

    Promise.all([p]).then(([rows]) => {
        if (rows.length > 0) {
            res.render('vwAdmin/QuanLyNhan/edit', {
                tag: rows[0],
                error: false,
                layout: 'adminQuanLyNhan.hbs',
                title: 'Quản lý nhãn',
                logo: 'logo.png',
            });
        }
        else {
            res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                tag: rows[0],
                error: true,
                layout: 'adminQuanLyNhan.hbs',
                title: 'Quản lý nhãn',
                logo: 'logo.png'
            });
        }
    }).catch(err => {
        console.log(err);
    });

})

router.post('/quanlynhan/update', (req, res) => {
    AdminModel.update(req.body).then(n => {
        res.redirect('/admin/quanlynhan');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlynhan/deleted', (req, res) => {
    var p = AdminModel.getAllTagDeleted();
    p.then(rows => {
        res.render('vwAdmin/QuanLyNhan/deleted.hbs', {
            tag: rows,
            layout: 'adminQuanLyNhan.hbs',
            title: 'Các nhãn đã xóa',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/quanlynhan/delete/:id', (req, res) => {
    var id = req.params.id;
    var entity = {
        TagID: id,
        Deleted: 1
    }
    AdminModel.updateTag(entity).then(n => {
        res.redirect('/admin/quanlynhan');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlynhan/restore/:id', (req, res) => {
    var id = req.params.id;
    var entity = {
        TagID: id,
        Deleted: 0
    }
    AdminModel.updateTag(entity).then(n => {
        res.redirect('/admin/quanlynhan');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlybaiviet', (req, res) => {

    //console.log(rows);
    res.render('vwAdmin/AdminQuanLyBaiViet.hbs', {
        layout: 'Admin.hbs',
        title: 'Quản lý bài viết',
        logo: 'logo.png'
    });
}
)


//QUẢN LÝ NGƯỜI DÙNG
router.get('/quanlynguoidung', (req, res) => {

    var p = AdminModel.getAllUser();
    p.then(rows => {
        res.render('vwAdmin/QuanLyNguoiDung/adminQuanLyNguoiDung.hbs', {
            user: rows,
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Quản lý người dùng',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
}
)

module.exports = router;