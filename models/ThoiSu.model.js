var db = require('../utils/db');

module.exports = {

    getAllNews: () => {
        return db.load('select * from news');
    },

    getSingleNews: News_ID => {
        return db.load(`select * from news where News_ID = ${News_ID}`);
        db.end
    },

    getCategoryOfNews: CatID => {
        return db.load(`select * from categories where CatID = ${CatID}`);
    },

    getWriterOfNews: Writer_ID => {
        return db.load(`select * from writer where Writer_ID = ${Writer_ID}`);
    },

    getAllTagsOfNews: News_ID => {
        return db.load(`SELECT TN.TagID, T.Tag_Name FROM tags_news as TN, tags AS T WHERE TN.News_ID = ${News_ID} and TN.TagID = T.TagID`);
    },

    getNewsSameCategory: (CatID, News_ID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and News_ID != ${News_ID} ORDER BY Time DESC LIMIT 0,8`);
    },

    getNewsHot: () => {
        return db.load(`SELECT * FROM news ORDER BY Views DESC LIMIT 0,10`);
    },

    // getCatAndChillByCatName: CatName => {
    //     return db.load(`select * from categories where CatName = '${CatName}'`);
    // },
};