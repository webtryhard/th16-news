var db = require('../utils/db');

module.exports = {

    getNewsHot: () => {
        return db.load(`SELECT * FROM news where Deleted = 0 and State_ID = 4 and News_Category = 0 ORDER BY Views DESC LIMIT 0,10`);
    },

    getLatestNews: () =>{
        return db.load(`SELECT * FROM news where Deleted = 0 and State_ID = 4 and News_Category = 0 ORDER BY Time DESC LIMIT 0,10`);
    },

    getTop10Cat: () =>{
        return db.load(`SELECT * FROM (SELECT C.CatID, C.CatName, SUM(N.Views) ttViews FROM categories C LEFT JOIN news N ON C.CatID = N.CatID and C.Deleted = 0 GROUP by C.CatID, C.CatName) TC ORDER BY TC.ttViews DESC LIMIT 0,10`);
    }, 

    getNewsTop10Cat: () =>{
        return db.load(`SELECT *
        FROM (SELECT t1.* 
        FROM (SELECT * FROM news WHERE Deleted = 0 and State_ID = 4 and News_Category = 0) t1 JOIN (SELECT * FROM news WHERE Deleted = 0 and State_ID = 4 and News_Category = 0) t2 ON t1.CatID = t2.CatID and t1.Time <= t2.Time
        GROUP BY t1.CatID, t1.News_ID 
        HAVING COUNT(*) <= 3) as M, (SELECT CatID 
                                        FROM (SELECT C.CatID, C.CatName, SUM(N.Views) ttViews 
                                                FROM categories C LEFT JOIN news N ON C.CatID = N.CatID and C.Deleted = 0
                                                GROUP by C.CatID, C.CatName) TC 
                                        ORDER BY TC.ttViews 
                                        DESC LIMIT 10) as N
        WHERE M.CatID = N.CatID`);
    }, 

    getNewsInWeek: ()=>{
        return db.load(`SELECT * FROM news n WHERE TIMESTAMPDIFF(minute,n.Time,Now()) <= 10080 and n.Deleted = 0 and n.State_ID = 4 and n.News_Category = 0 ORDER BY n.Views DESC LIMIT 5`);
    },
    
    getAllCat: ()=>{
        return db.load(`SELECT * FROM categories where Deleted = 0`);
    },
};
