var db = require('../utils/db');

module.exports = {
    //GET CATEGORIES
    getAllCat: () => {
        return db.load(`SELECT cat1.CatID ID, cat1.CatName TenCM, cat1.Parent_ID IDCha, cat2.CatName TenCMCha, cat1.Deleted FROM categories cat1 LEFT JOIN categories cat2 ON cat1.Parent_ID=cat2.CatID WHERE cat1.Deleted!=1`);
    },
    getAllCatDeleted: () => {
        return db.load(`SELECT cat1.CatID ID, cat1.CatName TenCM, cat1.Parent_ID IDCha, cat2.CatName TenCMCha, cat1.Deleted FROM categories cat1 LEFT JOIN categories cat2 ON cat1.Parent_ID=cat2.CatID WHERE cat1.Deleted=1`);
    },
    getAllParentCat: () => {
        return db.load(`SELECT DISTINCT ct1.Parent_ID ID, ct2.CatName TenCM FROM categories ct1 LEFT JOIN categories ct2 on ct1.Parent_ID=ct2.CatID`);
    },
    singleCat: id => {
        return db.load(`SELECT DISTINCT ct1.*, ct2.CatName TenCM FROM categories ct1 LEFT JOIN categories ct2 on ct1.Parent_ID=ct2.CatID WHERE ct1.CatID= ${id}`);
    },
    addCat: entity => {
        return db.add('categories', entity);
    },
    updateCat: entity => {
        return db.update('categories', 'CatID', entity);
    },

    //GET TAG
    getAllTag: () => {
        return db.load(`SELECT * FROM tags WHERE tags.Deleted!=1`);
    },
    getAllTagDeleted: () => {
        return db.load(`SELECT * FROM tags WHERE tags.Deleted=1`);
    },
    singleTag: id => {
        return db.load(`SELECT * FROM tags WHERE tags.TagID= ${id}`);
    },
    addTag: entity => {
        return db.add('tags', entity);
    },
    updateTag: entity => {
        return db.update('tags', 'TagID', entity);
    },

    //GET USER
    getAllUser: () => {
        return db.load(`SELECT *
        FROM user us
        WHERE us.Deleted!=1`)
    },
    getAllUserDeleted: () => {
        return db.load(`SELECT *
        FROM user us
        WHERE us.Deleted=1`)
    },
    singleUser: id => {
        return db.load(`SELECT * FROM user WHERE user.User_ID= ${id}`);
    },
    addUser: entity => {
        return db.add('user', entity);
    },
    updateUser: entity => {
        return db.update('user', 'User_ID', entity);
    },
};