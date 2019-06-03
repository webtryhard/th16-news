var db = require('../utils/db');

module.exports = {

    getAllNews: () => {
        return db.load('select * from news');
    },

    getSingleNews: News_ID => {
        return db.load(`select * from news where News_ID = ${News_ID}`);
        db.end
    },

    getCatOfNews: CatID => {
        return db.load(`select * from categories where CatID = ${CatID}`);
    },

    getWriterOfNews: Writer_ID => {
        return db.load(`select * from writer where Writer_ID = ${Writer_ID}`);
    },

    getAllTagsOfNews: News_ID => {
        return db.load(`SELECT TN.TagID, T.Tag_Name FROM tags_news as TN, tags AS T WHERE TN.News_ID = ${News_ID} and TN.TagID = T.TagID`);
    },

    getAllTagsManyNews: (offset, limit) => {
        return db.load(`SELECT N.News_ID, TN.TagID, T.Tag_Name FROM tags T,tags_news TN, (SELECT News_ID FROM news ORDER BY Time DESC LIMIT ${offset},${limit}) as N WHERE TN.News_ID = N.News_ID and TN.TagID = T.TagID`);
    },

    getNewsHot: () => {
        return db.load(`SELECT * FROM news ORDER BY Views DESC LIMIT 0,10`);
    },

    getCatAndChillByCatID: CatID => {
        return db.load(`select * from categories where CatID = ${CatID} or Parent_ID = ${CatID}`);
    },

    getNewsByCat: (CatID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} ORDER BY Time DESC`);
    },

    countNewsByCat: (CatID) => {
        return db.load(`SELECT count(*) as total FROM news where CatID = ${CatID} `);
    },

    getNewsSameCat: (CatID, News_ID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and News_ID != ${News_ID} ORDER BY Time DESC LIMIT 0,8`);
    },
};