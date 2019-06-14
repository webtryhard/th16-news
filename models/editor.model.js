var db = require('../utils/db');

module.exports = {

    getDraft: (CatID) => {
        return db.load(`SELECT * FROM news where CatID = ${CatID} and Deleted = 0 and State_ID = 4 ORDER BY Time DESC LIMIT 0,5`);
    },
    
};
