var db = require('../utils/db');

module.exports = {

    getDraft: (CatID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4 ORDER BY Time DESC LIMIT 0,5`);
    },
    getAllNew: id => {
        return db.load(`SELECT us.User_ID, us.Username,news.News_ID, news.News_Name, news.Summary,news.Image_Avatar,news.Time,news.Views ,ns.State_ID,ns.State_Name
        FROM user us JOIN news ON us.User_ID=news.Writer_ID
        	JOIN categories ct ON news.CatID=ct.CatID
                    JOIN news_state ns ON news.State_ID=ns.State_ID
        WHERE us.User_ID=${id}`);
    },
    singleUser: id => {
        return db.load(`SELECT * FROM user WHERE user.User_ID= ${id}`);
    },
    singleNew: id => {
        return db.load(`SELECT *
        FROM news JOIN categories ct ON news.CatID=ct.CatID
                    JOIN news_state ns ON news.State_ID=ns.State_ID
        WHERE news.News_ID=${id}`);
    },
    getAllTag: () => {
        return db.load(`SELECT * FROM tags WHERE Deleted=0`);
    },
    getAllNewState: () => {
        return db.load(`SELECT * FROM news_state`);
    },
    getAllCat: () => {
        return db.load(`SELECT cat1.CatID, cat1.CatName , cat1.Parent_ID Parent_ID, cat2.CatName Parent_Name, cat1.Deleted FROM categories cat1 LEFT JOIN categories cat2 ON cat1.Parent_ID=cat2.CatID WHERE cat1.Deleted!=1`);
    },
    addNew: entity => {
        return db.add('news', entity);
    },
    updateNew: entity => {
        return db.update('news', 'News_ID', entity);
    },
};