var db = require('../../utils/db');

module.exports = {
getNews: News_ID => {
    return db.load(`select * from news where News_ID = ${News_ID}`);
}
};