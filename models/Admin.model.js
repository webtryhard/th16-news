var db = require('../utils/db');

module.exports = {

    getAllCat: () => {
        return db.load(`SELECT cat1.CatID ID, cat1.CatName TenCM, cat2.CatName TenCMCha FROM categories cat1 LEFT JOIN categories cat2 ON cat1.Parent_ID=cat2.CatID`);
    },

    getAllParentCat: () => {
        return db.load(`SELECT DISTINCT ct1.Parent_ID ID, ct2.CatName TenCM FROM categories ct1 LEFT JOIN categories ct2 on ct1.Parent_ID=ct2.CatID`);
    },

    add: entity => {
        return db.add('categories', entity);
    }
};