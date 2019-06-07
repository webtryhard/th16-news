var db = require('../utils/db');

module.exports = {

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

    add: entity => {
        return db.add('categories', entity);
    },

    update: entity => {
        return db.update('categories', 'CatID', entity);
    }
};