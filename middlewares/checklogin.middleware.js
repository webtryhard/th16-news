// module.exports.isAuthenticated = function(req, res, next) {
//     if (!req.cookies.username) {
//         res.redirect('/')
//         return
//     }
//     res.locals.isAuthenticated = true;
//     res.locals.username = req.cookies.username;
//     next()
// }

module.exports = (req, res, next) => {
    if (req.user) {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;
    }
    next();
}