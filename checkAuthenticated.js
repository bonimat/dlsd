// eslint-disable-next-line require-jsdoc
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard');
    } else {
        next();
    }
}

exports.checkAuthenticated = checkAuthenticated;
// eslint-disable-next-line require-jsdoc
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/users/login');
    }
}
exports.checkNotAuthenticated = checkNotAuthenticated;
