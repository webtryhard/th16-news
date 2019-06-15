var db = require('../utils/db');

module.exports = {
    //GET CATEGORIES
    getAllCat: () => {
        return db.load(`SELECT cat1.CatID ID, cat1.CatName TenCM, cat1.Parent_ID IDCha, cat2.CatName TenCMCha, cat1.Deleted FROM categories cat1 LEFT JOIN categories cat2 ON cat1.Parent_ID=cat2.CatID WHERE cat1.Deleted!=1`);
    },
    getAllCatDeleted: () => {
        return db.load(`SELECT cat1.CatID ID, cat1.CatName TenCM, cat1.Parent_ID IDCha, cat2.CatName TenCMCha, cat1.Deleted FROM categories cat1 LEFT JOIN categories cat2 ON cat1.Parent_ID=cat2.CatID WHERE cat1.Deleted=1`);
    },
    getAllParentCat: () => {
        return db.load(`SELECT DISTINCT ct1.Parent_ID ID, ct2.CatName TenCM FROM categories ct1 LEFT JOIN categories ct2 on ct1.Parent_ID=ct2.CatID`);
    },
    singleCat: id => {
        return db.load(`SELECT DISTINCT ct1.*, ct2.CatName TenCM FROM categories ct1 LEFT JOIN categories ct2 on ct1.Parent_ID=ct2.CatID WHERE ct1.CatID= ${id}`);
    },
    addCat: entity => {
        return db.add('categories', entity);
    },
    updateCat: entity => {
        return db.update('categories', 'CatID', entity);
    },

    //GET TAG
    getAllTag: () => {
        return db.load(`SELECT * FROM tags WHERE tags.Deleted!=1`);
    },
    getAllTagDeleted: () => {
        return db.load(`SELECT * FROM tags WHERE tags.Deleted=1`);
    },
    singleTag: id => {
        return db.load(`SELECT * FROM tags WHERE tags.TagID= ${id}`);
    },
    addTag: entity => {
        return db.add('tags', entity);
    },
    updateTag: entity => {
        return db.update('tags', 'TagID', entity);
    },

    //GET USER
    getAllUser: () => {
        return db.load(`SELECT *
        FROM user us
        WHERE us.Deleted!=1`)
    },
    getAllUserDeleted: () => {
        return db.load(`SELECT *
        FROM user us
        WHERE us.Deleted=1`)
    },

    getAllCatFromTask: id => {
        return db.load(`SELECT A.*, user.Username
        FROM (SELECT ct.CatID, ct.CatName, ct.Parent_ID, ct2.CatName ParentName, ta.ID_Editor, ta.Deleted
              FROM categories ct LEFT JOIN categories ct2 on ct.Parent_ID=ct2.CatID
                                      LEFT JOIN task_editor ta ON ct.CatId=ta.ID_Cat) A
                 LEFT JOIN user on A.ID_Editor = user.User_ID
        WHERE A.ID_Editor is null ||  A.ID_Editor!=${id}`);
    },

    getAllCatFromEditor: id => {
        return db.load(`SELECT A.*, user.Username
        FROM (SELECT ct.CatID, ct.CatName, ct.Parent_ID, ct2.CatName ParentName, ta.ID_Editor, ta.Deleted
              FROM categories ct LEFT JOIN categories ct2 on ct.Parent_ID=ct2.CatID
                                      LEFT JOIN task_editor ta ON ct.CatId=ta.ID_Cat) A
                 LEFT JOIN user on A.ID_Editor = user.User_ID
        WHERE A.ID_Editor=${id}`);
    },

    singleUser: id => {
        return db.load(`SELECT * FROM user WHERE user.User_ID= ${id}`);
    },
    addUser: entity => {
        return db.add('user', entity);
    },
    updateUser: entity => {
        return db.update('user', 'User_ID', entity);
    },
    addTask: entity => {
        return db.add('task_editor', entity);
    },
    deleteTask: (id, id2) => {
        return db.delete('task_editor', 'ID_Editor', 'ID_Cat', id, id2);
    },

    //GET NEWS
    getAllNews: () => {
        return db.load(`SELECT *
        FROM news JOIN categories ct ON news.CatID=ct.CatID
                    JOIN news_state ns ON news.State_ID=ns.State_ID
        WHERE news.Deleted=0`);
    },
    singleNew: id => {
        return db.load(`SELECT *
        FROM news JOIN categories ct ON news.CatID=ct.CatID
                    JOIN news_state ns ON news.State_ID=ns.State_ID
        WHERE news.News_ID=${id}`);
    },
    getAllNewState: () => {
        return db.load(`SELECT * FROM news_state`);
    },
    addNew: entity => {
        return db.add('news', entity);
    },
    updateNew: entity => {
        return db.update('news', 'News_ID', entity);
    },
};