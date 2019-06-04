var categoryModel = require('../models/user.model');

module.exports = (req, res, next) => {
  categoryModel.allWithDetails().then(rows => {
    res.locals.lcCategories = rows;
    next();
  })
}
