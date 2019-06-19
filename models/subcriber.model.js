var db = require('../utils/db');

module.exports = {

    getSingleSubcriber: User_ID => {
        return db.load(`select * from user where User_ID = ${User_ID}`);
    },

    getLatestNews: () => {
        return db.load(`SELECT * FROM news where Deleted = 0 and State_ID = 4 ORDER BY Time DESC LIMIT 0,10`);
    },

    getTop10Cat: () => {
        return db.load(`SELECT * 
                        FROM (SELECT C.CatID, C.CatName, SUM(N.Views) ttViews 
                                FROM categories C LEFT JOIN news N ON C.CatID = N.CatID 
                                where C.Deleted = 0 
                                GROUP by C.CatID, C.CatName) TC 
                        ORDER BY TC.ttViews DESC LIMIT 0,10`);
    },

    getNewsTop10Cat: () => {
        return db.load(`SELECT M.*
        FROM (SELECT t1.* 
            FROM news t1 JOIN news t2 ON t1.CatID = t2.CatID and t1.Time <= t2.Time
            WHERE t1.Deleted = 0 and t1.State_ID = 4 and t2.Deleted = 0 and t2.State_ID = 4
            GROUP BY t1.CatID, t1.News_ID 
            HAVING COUNT(*) <= 3) as M, 
            (SELECT CatID 
            FROM (SELECT C.CatID, C.CatName, SUM(N.Views) ttViews 
                    FROM categories C LEFT JOIN news N ON C.CatID = N.CatID
                    Where c.Deleted = 0
                    GROUP by C.CatID, C.CatName) TC 
            ORDER BY TC.ttViews DESC LIMIT 10) as N
        WHERE M.CatID = N.CatID`);
    },

    getNewsInWeek: () => {
        return db.load(`SELECT * FROM news n WHERE TIMESTAMPDIFF(minute,n.Time,Now()) <= 10080 and n.Deleted = 0 and n.State_ID = 4 ORDER BY News_Category desc, n.Views DESC LIMIT 5`);
    },

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
        return db.load(`SELECT N.News_ID, TN.TagID, T.Tag_Name FROM tags T,tags_news TN, (SELECT News_ID FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4 ORDER BY News_Category desc, Time DESC LIMIT ${offset},${limit}) as N WHERE TN.News_ID = N.News_ID and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getCatAndChillByCatID: CatID => {
        return db.load(`select * from categories where (CatID = ${CatID} or Parent_ID = ${CatID}) and Deleted = 0`);
    },

    getNewsByCat: (CatID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4 ORDER BY News_Category desc, Time DESC`);
    },

    countNewsByCat: (CatID) => {
        return db.load(`SELECT count(*) as total FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4`);
    },

    getNewsSameCat: (CatID, News_ID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and News_ID != ${News_ID} and Deleted = 0 and State_ID = 4 ORDER BY News_Category desc,Time DESC LIMIT 0,8`);
    },

    getAllCat: () => {
        return db.load(`SELECT * FROM categories where Deleted = 0`);
    },

    getComment: News_ID => {
        return db.load(`SELECT m.*, u.Username, u.Avatar FROM comment m, user u WHERE m.News_ID = ${News_ID} and m.User_ID = u.User_ID order by Time desc`);
    },

    updateSub: entity => {
        return db.update('user', 'User_ID', entity);
    },

    addComment: entity => {
        return db.add('comment', entity);
    },

    viewListFollowTag: TagID => {
        return db.load(`SELECT N.*, T.Tag_Name FROM tags T, news N, tags_news TN WHERE T.TagID = ${TagID} and T.TagID = TN.TagID and TN.News_ID = N.News_ID`);
    },

    viewListFollowTagSub: TagID => {
        return db.load(`SELECT N.*, T.Tag_Name FROM tags T, news N, tags_news TN WHERE T.TagID = ${TagID} and T.TagID = TN.TagID and TN.News_ID = N.News_ID order by N.News_Category DESC`);
    }
    ,

    searchTitle: value => {
        return db.load(`SELECT * FROM news WHERE news.News_Name LIKE "%${value}%"`)
    },
    searchContent: value => {
        return db.load(`SELECT * FROM news WHERE news.Content LIKE "%${value}%"`)
    },
    searchAbstract: value => {
        return db.load(`SELECT * FROM news WHERE news.Summary LIKE "%${value}%"`)
    },
};
