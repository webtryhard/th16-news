module.exports.requireAdmin = (req, res, next) => {
    if (req.cookies.userCatName !== 'admin') {
        res.redirect('/')
        return
    }
    next()
}
module.exports.requireEditor = (req, res, next) => {
    if (req.cookies.userCatName !== 'Editor') {
        res.redirect('/')
        return
    }
    next()
}
module.exports.requireSubcriber = (req, res, next) => {
    if (req.cookies.userCatName !== 'Subcriber') {
        res.redirect('/')
        return
    }
    next()
}
module.exports.requireWriter = (req, res, next) => {
    if (req.cookies.userCatName !== 'Writer') {
        res.redirect('/')
        return
    }
    next()
}