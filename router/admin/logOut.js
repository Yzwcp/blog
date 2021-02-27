module.exports = (req, res) => {
    req.session.destroy(function () {
       
        res.clearCookie('connect.sid');
        req.app.locals.usermsg = null;
        res.redirect('/admin/login');
        
    })
}