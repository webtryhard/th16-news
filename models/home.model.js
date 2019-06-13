var db = require('../utils/db');

module.exports = {

    getNewsHot: () => {
        return db.load(`SELECT * FROM news where Deleted = 0 and State_ID = 4 and News_Category = 0 ORDER BY Views DESC LIMIT 0,10`);
    },

    getAllCat: ()=>{
        return db.load(`SELECT * FROM categories where Deleted = 0`);
    },

    getAllCatAndNumberNews: ()=>{
        return db.load(`SELECT c.CatID, c.CatName, count(n.News_ID) as num_news FROM categories c left join news n on c.CatID = n.CatID where c.deleted = 0 group by c.CatID, c.CatName`);
    },

    getLatestNews: () =>{
        return db.load(`SELECT * FROM news where Deleted = 0 and State_ID = 4 and News_Category = 0 ORDER BY Time DESC LIMIT 0,10`);
    },

    getTop10Cat: () =>{
        return db.load(`SELECT * 
                        FROM (SELECT C.CatID, C.CatName, SUM(N.Views) ttViews 
                                FROM categories C LEFT JOIN news N ON C.CatID = N.CatID 
                                where C.Deleted = 0 
                                GROUP by C.CatID, C.CatName) TC 
                        ORDER BY TC.ttViews DESC LIMIT 0,10`);
    }, 

    getNewsTop10Cat: () =>{
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

    getNewsInWeek: ()=>{
        return db.load(`SELECT * FROM news n WHERE TIMESTAMPDIFF(minute,n.Time,Now()) <= 10080 and n.Deleted = 0 and n.State_ID = 4 and n.News_Category = 0 ORDER BY n.Views DESC LIMIT 5`);
    },
    
};
