var homeModel = require('../models/home.model');

module.exports = (req, res, next) => {
  var p1 = homeModel.getNewsHot();
  var p2 = homeModel.getAllCatAndNumberNews();
  var p3 = homeModel.getAllCat();
  var menu = [];
  Promise.all([p1, p2, p3]).then(([rows1, rows2, rows3]) => {
    for(i = 0; i < rows3.length; i++)
        {
            if(rows3[i].Parent_ID === null || rows3[i].Parent_ID === 0)
            {
                var child = [];
                for(j = 0; j < rows3.length; j++)
                {
                    if(rows3[j].Parent_ID === rows3[i].CatID)
                    {
                    child.push(rows3[j]);
                    }
                }
                menu.push({parent: rows3[i], childs : child})
            }
        }
    res.menu = menu;
    res.newsHot = rows1;
    res.categories = rows2;
    next();
  })
}
