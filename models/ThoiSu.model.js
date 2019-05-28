var db = require('../utils/db');

module.exports = {

    getAllNews: () => {
        return db.load('select * from news');
    },

    getNews: News_ID => {
        return db.load(`select * from news where News_ID = ${News_ID}`);
        db.end
    },

    getCategoryByNews: CatID => {
        return db.load(`select * from categories where CatID = ${CatID}`);
    },

    getWriterByNews: Writer_ID => {
        return db.load(`select * from writer where Writer_ID = ${Writer_ID}`);
    },

    getAllTagsByNews: News_ID => {
        return db.load(`SELECT TN.TagID, T.Tag_Name FROM tags_news as TN, tags AS T WHERE TN.News_ID = ${News_ID} and TN.TagID = T.TagID`);
    }
};