var db = require('../utils/db');

module.exports = {

    getAllNews: () => {
        return db.load('select * from news where Deleted = 0 and State_ID = 4');
    },

    getSingleNews: News_ID => {
        return db.load(`select * from news where News_ID = ${News_ID}`);
        db.end
    },

    getCatOfNews: CatID => {
        return db.load(`select * from categories where CatID = ${CatID}`);
    },

    getWriterOfNews: Writer_ID => {
        return db.load(`select * from user where User_ID = ${Writer_ID}`);
    },

    getAllTagsOfNews: News_ID => {
        return db.load(`SELECT TN.TagID, T.Tag_Name FROM tags_news as TN, tags AS T WHERE TN.News_ID = ${News_ID} and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getAllTagsManyNews: (CatID, offset, limit) => {
        return db.load(`SELECT N.News_ID, TN.TagID, T.Tag_Name FROM tags T,tags_news TN, (SELECT News_ID FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4 ORDER BY Time DESC LIMIT ${offset},${limit}) as N WHERE TN.News_ID = N.News_ID and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getCatAndChillByCatID: CatID => {
        return db.load(`select * from categories where (CatID = ${CatID} or Parent_ID = ${CatID}) and Deleted = 0`);
    },

    getNewsByCat: (CatID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4 ORDER BY Time DESC`);
    },

    countNewsByCat: (CatID) => {
        return db.load(`SELECT count(*) as total FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4`);
    },

    getNewsSameCat: (CatID, News_ID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and News_ID != ${News_ID} and Deleted = 0 and State_ID = 4 ORDER BY Time DESC LIMIT 0,8`);
    },

    getAllCat: ()=>{
        return db.load(`SELECT * FROM categories where Deleted = 0`);
    },

    getComment: News_ID => {
        return db.load(`SELECT m.*, u.Username, u.Avatar FROM comment m, user u WHERE m.News_ID = ${News_ID} and m.User_ID = u.User_ID order by time desc`);
    }

};