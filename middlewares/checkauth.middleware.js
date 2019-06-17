module.exports.requireAdmin = (req, res, next) => {
    if (req.cookies.username !== 'admin') {
        res.redirect('/')
        return
    }
    next()
}