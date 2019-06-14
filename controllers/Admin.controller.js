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
        console.log("=================" + rows[0]);
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
    var temp = req.body.Parent_ID;
    var entity;
    if (temp === "") {
        entity = {
            CatName: req.body.CatName,
        }
    }
    else {
        entity = {
            CatName: req.body.CatName,
            Parent_ID: temp
        }
    }
    AdminModel.addCat(entity)
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
    AdminModel.addTag(req.body)
        .then(id => {
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
router.get('/quanlynguoidung/add', (req, res) => {

    res.render('vwAdmin/QuanLyNguoiDung/add', {
        layout: 'adminQuanLyNguoiDung.hbs',
        title: 'Thêm người dùng',
    });

})

router.post('/quanlynguoidung/add', (req, res) => {
    AdminModel.addUser(req.body)
        .then(id => {
            res.render('vwAdmin/QuanLyNguoiDung/add', {
                layout: 'adminQuanLyNguoiDung.hbs',
                title: 'Thêm người dùng',
            });
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/quanlynguoidung/edit/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.singleUser(id);

    Promise.all([p]).then(([rows]) => {
        if (rows.length > 0) {
            res.render('vwAdmin/QuanLyNguoiDung/edit', {
                user: rows[0],
                error: false,
                layout: 'adminQuanLyNguoiDung.hbs',
                title: 'Quản lý người dùng',
                logo: 'logo.png',
                listCatUser: ['Admin', 'Subcriber', 'Editor', 'Writter'],
            });
        }
        else {
            res.render('vwAdmin/QuanLyNguoiDung/edit', {
                user: rows[0],
                error: true,
                layout: 'adminQuanLyNguoiDung.hbs',
                title: 'Quản lý người dùng',
                logo: 'logo.png',
                listCatUser: ['Subcriber', 'Admin', 'Editor', 'Writter'],
            });
        }
    }).catch(err => {
        console.log(err);
    });

})

router.post('/quanlynguoidung/update', (req, res) => {
    res.render('vwAdmin/QuanLyNguoiDung/edit', {
        user: rows[0],
        error: true,
        layout: 'adminQuanLyNguoiDung.hbs',
        title: 'Quản lý người dùng',
        logo: 'logo.png',
        listCatUser: ['Subcriber', 'Admin', 'Editor', 'Writter'],
    });
})

router.get('/quanlynguoidung/giahantaikhoan/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.singleUser(id);
    p.then(rows => {
        res.render('vwAdmin/QuanLyNguoiDung/giaHanTaiKhoan.hbs', {
            user: rows[0],
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Gia hạn tài khoản độc giả',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/quanlynguoidung/giahantaikhoan/:id', (req, res) => {
    AdminModel.updateUser(req.body).then(n => {
        res.redirect('/admin/quanlynguoidung');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlynguoidung/phancongchuyenmuc/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.getAllCatFromTask(id);
    var p2 = AdminModel.singleUser(id);
    Promise.all([p, p2]).then(([rows, rows2]) => {
        res.render('vwAdmin/QuanLyNguoiDung/phancongchuyenmuc.hbs', {
            cat: rows,
            user: rows2[0],
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Phân công chuyên mục',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/quanlynguoidung/chuyenmucdaphancong/:id', (req, res) => {
    var id = req.params.id;
    var p = AdminModel.getAllCatFromEditor(id);
    var p2 = AdminModel.singleUser(id);
    Promise.all([p, p2]).then(([rows, rows2]) => {
        res.render('vwAdmin/QuanLyNguoiDung/chuyenmucdaphancong.hbs', {
            cat: rows,
            user: rows2[0],
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Chuyên mục đã phân công',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/quanlynguoidung/phancong/:ide/:idc', (req, res) => {
    var ide = req.params.ide;
    var idc = req.params.idc;
    var entity = {
        ID_Editor: ide,
        ID_Cat: idc
    }
    AdminModel.addTask(entity).then(n => {
        res.redirect('/admin/quanlynguoidung/phancongchuyenmuc/' + ide);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlynguoidung/xoamucphancong/:ide/:idc', (req, res) => {
    var ide = req.params.ide;
    var idc = req.params.idc;

    AdminModel.deleteTask(ide, idc).then(n => {
        res.redirect('/admin/quanlynguoidung/chuyenmucdaphancong/' + ide);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlynguoidung/deleted', (req, res) => {
    var p = AdminModel.getAllUserDeleted();
    p.then(rows => {
        res.render('vwAdmin/QuanLyNguoiDung/deleted.hbs', {
            user: rows,
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Danh sách người dùng đã xóa',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/quanlynguoidung/delete/:id', (req, res) => {
    var id = req.params.id;
    var entity = {
        User_ID: id,
        Deleted: 1
    }
    AdminModel.updateUser(entity).then(n => {
        res.redirect('/admin/quanlynguoidung');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/quanlynguoidung/restore/:id', (req, res) => {
    var id = req.params.id;
    var entity = {
        User_ID: id,
        Deleted: 0
    }
    AdminModel.updateUser(entity).then(n => {
        res.redirect('/admin/quanlynguoidung/deleted');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})
module.exports = router;