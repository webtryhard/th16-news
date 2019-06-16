var db = require('../utils/db');

module.exports = {

    getSingleEditor: User_ID => {
        return db.load(`select * from user where User_ID = ${User_ID}`);
    },

    getCatOfEditor: User_ID => {
        return db.load(`select c.CatName 
                        from user u, assigned_categories ac, categories c 
                        where u.User_ID = ${User_ID} and u.User_ID = ac.User_ID and ac.CatID = c.CatID and c.Deleted = 0`);
    },

    getDraft: (User_ID, offset) => {
        return db.load(`SELECT ac.User_ID as Editor_ID, c.CatName,u.Name as writer,  n.* 
                        from assigned_categories ac, news n, user u, categories c 
                        WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 1 and n.Writer_ID = u.User_ID and n.CatID = c.CatID 
                        ORDER BY Time DESC LIMIT ${offset},5`);
    },

    getRefusedDraft: (User_ID, offset) => {
        return db.load(`SELECT ac.User_ID as Editor_ID, c.CatName,u.Name as writer,  n.* 
                        from assigned_categories ac, news n, user u, categories c 
                        WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 3 and n.Writer_ID = u.User_ID and n.CatID = c.CatID 
                        ORDER BY Time DESC LIMIT ${offset},5`);
    },

    getBrowsedDraft: (User_ID, offset) => {
        return db.load(`SELECT ac.User_ID as Editor_ID, c.CatName,u.Name as writer,  n.* 
                        from assigned_categories ac, news n, user u, categories c 
                        WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 2 and n.Writer_ID = u.User_ID and n.CatID = c.CatID 
                        ORDER BY Time DESC LIMIT ${offset},5`);
    },

    countNewsOfEditor: (User_ID) => {
        return db.load(`SELECT count(*) as total from assigned_categories ac, news n WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 1 `);
    },

    countRefusedDraftOfEditor: (User_ID) => {
        return db.load(`SELECT count(*) as total from assigned_categories ac, news n WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 3 `);
    },

    countBrowsedDraftOfEditor: (User_ID) => {
        return db.load(`SELECT count(*) as total from assigned_categories ac, news n WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 2 `);
    },

    getAllTagsManyNews: (User_ID, offset, limit) => {
        return db.load(`SELECT N.News_ID, TN.TagID, T.Tag_Name 
                        FROM tags T,tags_news TN, (SELECT n.News_ID 
                                                    from assigned_categories ac, news n
                                                    WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 1 
                                                    ORDER BY Time DESC LIMIT ${offset},${limit}) as N 
                        WHERE TN.News_ID = N.News_ID and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getAllTagsManyRefusedDraft: (User_ID, offset, limit) => {
        return db.load(`SELECT N.News_ID, TN.TagID, T.Tag_Name 
                        FROM tags T,tags_news TN, (SELECT n.News_ID 
                                                    from assigned_categories ac, news n
                                                    WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 3 
                                                    ORDER BY Time DESC LIMIT ${offset},${limit}) as N 
                        WHERE TN.News_ID = N.News_ID and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getAllTagsManyBrowsedDraft: (User_ID, offset, limit) => {
        return db.load(`SELECT N.News_ID, TN.TagID, T.Tag_Name 
                        FROM tags T,tags_news TN, (SELECT n.News_ID 
                                                    from assigned_categories ac, news n
                                                    WHERE ac.User_ID = ${User_ID} and ac.CatID = n.CatID and n.State_ID = 2 
                                                    ORDER BY Time DESC LIMIT ${offset},${limit}) as N 
                        WHERE TN.News_ID = N.News_ID and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getInfoSingleDraft: News_ID => {
        return db.load(`select c.CatName, u.Name as Writer , n.*
                        from categories c, news n, user u
                        where n.News_ID = ${News_ID} and n.CatID = c.CatID and u.User_ID = n.Writer_ID`);
    },

    getAllTagsOfDraft: News_ID => {
        return db.load(`SELECT TN.TagID, T.Tag_Name FROM tags_news as TN, tags AS T WHERE TN.News_ID = ${News_ID} and TN.TagID = T.TagID and T.Deleted = 0`);
    },

    getAllTags: () => {
        return db.load(`SELECT T.TagID, T.Tag_Name FROM tags AS T where T.Deleted = 0`);
    },

    getAllCat: () => {
        return db.load(`SELECT C.CatID, C.CatName FROM categories AS C where C.Deleted = 0`);
    },

    updateRefuse: entity => {
        return db.update('news', 'News_ID', entity);
    },
    addTag: entity => {
        return db.addTags('tags_news', entity);
    },
    deleteTag: (id, id2) => {
        return db.delete('tags_news', 'News_ID', 'TagID', id, id2);
    },
};
