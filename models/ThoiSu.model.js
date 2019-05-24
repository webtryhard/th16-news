var db = require('../utils/db');

module.exports = {

    getAllNews: () => {
        return db.load('select * from news');
    },

    getNews: News_ID => {
        return db.load(`select * from news where News_ID = ${News_ID}`);
    },

    getCategory: CatID => {
        return db.load(`select * from categories where CatID = ${CatID}`);
    }
};