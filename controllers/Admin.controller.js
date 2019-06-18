var express = require('express');
var router = express.Router();
var AdminModel = require('../models/admin.model');

router.get('/:id', (req, res) => {
    var id = req.params.id;
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllUser();

    if (id !== req.cookies.userId) {
        res.redirect("/")
        return
    }

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyNguoiDung/adminQuanLyNguoiDung.hbs', {
            admin: row1[0],
            user: row2,
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Trang quản lý của admin',
            logo: 'logo.png',
        });
    }).catch(err => {
        console.log(err);
    });
})

//QUẢN LÝ CHUYÊN MỤC
router.get('/:id/quanlychuyenmuc', (req, res) => {
    var id = req.params.id;
    if (id !== req.cookies.userId) {
        res.redirect("/")
        return
    }
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllCat();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyChuyenMuc/adminQuanLyChuyenMuc.hbs', {
            admin: row1[0],
            cat: row2,
            layout: 'adminQuanLyChuyenMuc.hbs',
            title: 'Quản lý chuyên mục',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:id/quanlychuyenmuc/deleted', (req, res) => {
    var id = req.params.id;
    if (id !== req.cookies.userId) {
        res.redirect("/")
        return
    }
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllCatDeleted();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyChuyenMuc/deleted.hbs', {
            admin: row1[0],
            cat: row2,
            layout: 'adminQuanLyChuyenMuc.hbs',
            title: 'Các chuyên mục đã xóa',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/:ida/quanlychuyenmuc/delete/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        CatID: id,
        Deleted: 1
    }
    AdminModel.updateCat(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlychuyenmuc');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlychuyenmuc/restore/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        CatID: id,
        Deleted: 0
    }
    AdminModel.updateCat(entity).then(n => {
        res.redirect('/admin' + ida + '/quanlychuyenmuc');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlychuyenmuc/edit/:id', (req, res) => {
    var id = req.params.id;
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    var p = AdminModel.singleCat(id);
    var p2 = AdminModel.getAllParentCat();

    Promise.all([p, p2, admin]).then(([rows, rows2, row3]) => {
        if (rows.length > 0) {
            if (rows[0].Parent_ID == null) {
                res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                    cat: rows[0],
                    parentCat: rows2,
                    admin: row3[0],
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
                    admin: row3[0],
                    error: false,
                    layout: 'adminQuanLyChuyenMuc.hbs',
                    title: 'Chỉnh sửa chuyên mục',
                    logo: 'logo.png',
                    isNull: false
                });
            }

        } else {
            res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                cat: rows[0],
                parentCat: rows2,
                admin: row3[0],
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

router.post('/:ida/quanlychuyenmuc/update', (req, res) => {
    var ida = req.params.ida;
    AdminModel.updateCat(req.body).then(n => {
        res.redirect('/admin/' + ida + '/quanlychuyenmuc');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlychuyenmuc/add', (req, res) => {
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    var p = AdminModel.getAllParentCat();
    Promise.all([admin, p]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyChuyenMuc/add.hbs', {
            admin: row1[0],
            parentCat: row2,
            layout: 'adminQuanLyChuyenMuc.hbs',
            title: 'Thêm chuyên mục',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.post('/:ida/quanlychuyenmuc/add', (req, res) => {
    var ida = req.params.ida;
    var temp = req.body.Parent_ID;
    var entity;
    if (temp === "") {
        entity = {
            CatName: req.body.CatName,
        }
    } else {
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

router.get('/:ida/quanlychuyenmuc/restore/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var admin = AdminModel.singleUser(ida);
    var p = AdminModel.singleCat(id);
    var p2 = AdminModel.getAllParentCat();

    Promise.all([p, p2, admin]).then(([rows, rows2, row3]) => {
        if (rows.length > 0) {
            if (rows[0].Parent_ID == null) {
                res.render('vwAdmin/QuanLyChuyenMuc/restore', {
                    cat: rows[0],
                    parentCat: rows2,
                    admin: row3[0],
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
                    admin: row3[0],
                    error: false,
                    layout: 'adminQuanLyChuyenMuc.hbs',
                    title: 'Quản lý chuyên mục',
                    logo: 'logo.png',
                    isNull: false
                });
            }

        } else {
            res.render('vwAdmin/QuanLyChuyenMuc/restore', {
                cat: rows[0],
                parentCat: rows2,
                admin: row3[0],
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
router.get('/:ida/quanlynhan', (req, res) => {
    var id = req.params.ida;
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllTag();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyNhan/adminQuanLyNhan.hbs', {
            admin: row1[0],
            tag: row2,
            layout: 'adminQuanLyNhan.hbs',
            title: 'Quản lý nhãn',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})
router.get('/:ida/quanlynhan/add', (req, res) => {
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    admin.then(row => {
        res.render('vwAdmin/QuanLyNhan/add', {
            layout: 'adminQuanLyNhan.hbs',
            title: 'Thêm nhãn',
            admin: row[0],
        });
    }).catch(err => {

    })
})

router.post('/:ida/quanlynhan/add', (req, res) => {
    AdminModel.addTag(req.body)
        .then(id => {
            res.redirect('/admin/' + id + '/quanlynhan');
        }).catch(err => {
            console.log(err);
            res.end('error');
        })
})

router.get('/:ida/quanlynhan/edit/:id', (req, res) => {
    var id = req.params.id;
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    var p = AdminModel.singleTag(id);

    Promise.all([p, admin]).then(([rows, admin]) => {
        if (rows.length > 0) {
            res.render('vwAdmin/QuanLyNhan/edit', {
                tag: rows[0],
                error: false,
                admin: admin[0],
                layout: 'adminQuanLyNhan.hbs',
                title: 'Chỉnh sửa nhãn',
                logo: 'logo.png',
            });
        } else {
            res.render('vwAdmin/QuanLyChuyenMuc/edit', {
                tag: rows[0],
                error: true,
                admin: admin[0],
                layout: 'adminQuanLyNhan.hbs',
                title: 'Chỉnh sửa nhãn',
                logo: 'logo.png'
            });
        }
    }).catch(err => {
        console.log(err);
    });

})

router.post('/:ida/quanlynhan/update', (req, res) => {
    var id = req.params.ida;
    AdminModel.updateCat(req.body).then(n => {
        res.redirect('/admin/' + id + '/quanlynhan');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:id/quanlynhan/deleted', (req, res) => {
    var id = req.params.id;
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllTagDeleted();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyNhan/deleted.hbs', {
            admin: row1[0],
            tag: row2,
            layout: 'adminQuanLyNhan.hbs',
            title: 'Các nhãn đã xóa',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/:ida/quanlynhan/delete/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        TagID: id,
        Deleted: 1
    }
    AdminModel.updateTag(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlynhan');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlynhan/restore/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        TagID: id,
        Deleted: 0
    }
    AdminModel.updateTag(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlynhan');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})


//QUẢN LÝ BÀI VIẾT
router.get('/:id/quanlybaiviet', (req, res) => {
    var id = req.params.id;
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllNews();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyBaiViet/adminQuanLyBaiViet.hbs', {
            admin: row1[0],
            news: row2,
            layout: 'adminQuanLyBaiViet.hbs',
            title: 'Quản lý bài viết',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:id/quanlybaiviet/add', (req, res) => {
    var id = req.params.id;
    var admin = AdminModel.singleUser(id);
    var p1 = AdminModel.getAllUser();
    var p2 = AdminModel.getAllNewState();
    var p3 = AdminModel.getAllCat();
    Promise.all([p1, p2, p3, admin]).then(([row1, row2, row3, admin]) => {
        res.render('vwAdmin/QuanLyBaiViet/add.hbs', {
            admin: admin[0],
            user: row1,
            newState: row2,
            cat: row3,
            layout: 'adminQuanLyBaiViet.hbs',
            title: 'Thêm bài viết',
            logo: 'logo.png',
        });
    }).catch(err => {
        console.log(err);
    });

})

router.post('/:ida/quanlybaiviet/add', (req, res) => {
    var ida = req.params.ida;
    AdminModel.addNew(req.body)
        .then(id => {
            res.redirect('/admin/' + ida + '/quanlybaiviet');
        })
        .catch(err => {
            console.log(err);
        })
})


router.get('/:ida/quanlybaiviet/edit/:id', (req, res) => {
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    var id = req.params.id;
    var p = AdminModel.singleNew(id);
    var p2 = AdminModel.getAllNewState();
    var p3 = AdminModel.getAllCat();

    Promise.all([p, p2, p3, admin]).then(([rows, row2, row3, admin]) => {
        if (rows.length > 0) {
            res.render('vwAdmin/QuanLyBaiViet/edit.hbs', {
                news: rows[0],
                newState: row2,
                admin: admin[0],
                cat: row3,
                error: false,
                layout: 'adminQuanLyBaiViet.hbs',
                title: 'Chỉnh sửa bài viết',
                logo: 'logo.png',
            });
        } else {
            res.render('vwAdmin/QuanLyBaiViet/AdminQuanLyBaiViet.hbs', {
                news: rows[0],
                newState: row2,
                cat: row3,
                admin: admin[0],
                error: true,
                layout: 'adminQuanLyBaiViet.hbs',
                title: 'Chỉnh sửa bài viết',
                logo: 'logo.png',
            });
        }
    }).catch(err => {
        console.log(err);
    });

})

router.post('/:ida/quanlybaiviet/update', (req, res) => {
    var ida = req.params.ida;
    AdminModel.updateNew(req.body).then(n => {
        res.redirect('/admin/' + ida + '/quanlybaiviet');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlybaiviet/delete/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        News_ID: id,
        Deleted: 1
    }
    AdminModel.updateNew(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlybaiviet');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlybaiviet/xuatban/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        News_ID: id,
        State_ID: 4
    }

    AdminModel.updateNew(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlybaiviet');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

//QUẢN LÝ NGƯỜI DÙNG
router.get('/:ida/quanlynguoidung', (req, res) => {
    var id = req.params.ida;
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllUser();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyNguoiDung/adminQuanLyNguoiDung.hbs', {
            admin: row1[0],
            user: row2,
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Quản lý người dùng',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:ida/quanlynguoidung/add', (req, res) => {
    var id = req.params.ida;
    var admin = AdminModel.singleUser(id);
    admin.then(row => {
        res.render('vwAdmin/QuanLyNguoiDung/add', {
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Thêm người dùng',
            admin: row[0]
        });
    }).catch(err => {

    })

})

router.post('/:ida/quanlynguoidung/add', (req, res) => {
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

router.get('/:ida/quanlynguoidung/edit/:id', (req, res) => {
    var id = req.params.id;
    var ida = req.params.ida;
    var p = AdminModel.singleUser(id);
    var admin = AdminModel.singleUser(ida);

    Promise.all([p, admin]).then(([rows, admin]) => {
        if (rows.length > 0) {
            res.render('vwAdmin/QuanLyNguoiDung/edit', {
                user: rows[0],
                error: false,
                admin: admin[0],
                layout: 'adminQuanLyNguoiDung.hbs',
                title: 'Quản lý người dùng',
                logo: 'logo.png',
                listCatUser: ['Admin', 'Subcriber', 'Editor', 'Writter'],
            });
        } else {
            res.render('vwAdmin/QuanLyNguoiDung/edit', {
                user: rows[0],
                error: true,
                admin: admin[0],
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

router.post('/:id/quanlynguoidung/update', (req, res) => {
    var id = req.params.id;
    AdminModel.updateUser(req.body).then(n => {
        console.log(req.body);
        res.redirect('/admin/' + id + '/quanlynguoidung');
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:ida/quanlynguoidung/giahantaikhoan/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var p = AdminModel.singleUser(id);
    var p2 = AdminModel.singleUser(ida);
    Promise.all([p, p2]).then(([rows, row2]) => {
        res.render('vwAdmin/QuanLyNguoiDung/giaHanTaiKhoan.hbs', {
            user: rows[0],
            admin: row2[0],
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Gia hạn tài khoản độc giả',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/:id/quanlynguoidung/giahantaikhoan/:id', (req, res) => {
    var p = req.params.id;
    AdminModel.updateUser(req.body).then(n => {
        res.redirect('/admin/' + id + '/quanlynguoidung');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlynguoidung/phancongchuyenmuc/:id', (req, res) => {
    var id = req.params.id;
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    var p = AdminModel.getAllCatFromTask(id);
    var p2 = AdminModel.singleUser(id);
    Promise.all([p, p2, admin]).then(([rows, rows2, admin]) => {
        res.render('vwAdmin/QuanLyNguoiDung/phancongchuyenmuc.hbs', {
            cat: rows,
            user: rows2[0],
            admin: admin[0],
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Phân công chuyên mục',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:ida/quanlynguoidung/chuyenmucdaphancong/:id', (req, res) => {
    var ida = req.params.ida;
    var admin = AdminModel.singleUser(ida);
    var id = req.params.id;
    var p = AdminModel.getAllCatFromEditor(id);
    var p2 = AdminModel.singleUser(id);
    Promise.all([p, p2, admin]).then(([rows, rows2, admin]) => {
        res.render('vwAdmin/QuanLyNguoiDung/chuyenmucdaphancong.hbs', {
            cat: rows,
            user: rows2[0],
            admin: admin[0],
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Chuyên mục đã phân công',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:ida/quanlynguoidung/phancong/:ide/:idc', (req, res) => {
    var ida = req.params.ida;
    var ide = req.params.ide;
    var idc = req.params.idc;
    var entity = {
        ID_Editor: ide,
        ID_Cat: idc
    }
    AdminModel.addTask(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlynguoidung/phancongchuyenmuc/' + ide);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlynguoidung/xoamucphancong/:ide/:idc', (req, res) => {
    var ida = req.params.ida;
    var ide = req.params.ide;
    var idc = req.params.idc;

    AdminModel.deleteTask(ide, idc).then(n => {
        res.redirect('/admin/' + ida + '/quanlynguoidung/chuyenmucdaphancong/' + ide);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlynguoidung/deleted', (req, res) => {
    var id = req.params.ida;
    var p1 = AdminModel.singleUser(id);
    var p2 = AdminModel.getAllUserDeleted();

    Promise.all([p1, p2]).then(([row1, row2]) => {
        res.render('vwAdmin/QuanLyNguoiDung/deleted.hbs', {
            admin: row1[0],
            user: row2,
            layout: 'adminQuanLyNguoiDung.hbs',
            title: 'Danh sách người dùng đã xóa',
            logo: 'logo.png'
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/:ida/quanlynguoidung/delete/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        User_ID: id,
        Deleted: 1
    }
    AdminModel.updateUser(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlynguoidung');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:ida/quanlynguoidung/restore/:id', (req, res) => {
    var ida = req.params.ida;
    var id = req.params.id;
    var entity = {
        User_ID: id,
        Deleted: 0
    }
    AdminModel.updateUser(entity).then(n => {
        res.redirect('/admin/' + ida + '/quanlynguoidung/deleted');
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})
module.exports = router;