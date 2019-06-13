module.exports.requireAuth = function(req, res, next) {
    // if(!req.cookies.username){
    //     res.redirect('/')
    //     return
    // }
    if (req.cookies.username !== 'admin') {
        res.redirect('/')
        return
    }
    // res.locals.isAuthenticated = true;
    // res.locals.username = req.cookies.username;

    next()

}