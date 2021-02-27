///登录拦截

const guard = (req, res, next) => {
    //判断用户是否登录页面
        
    //判断用户登录状态  判断req.session有没有user属性

    //如果是登录的 就放行

    //如果不是登录的就重定向到登入

    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        //用户是登入状态 并且是普通用户
        if (req.session.role =='normal') {
          return  res.redirect('/home/')
        }
        next();
    }

}
module.exports = guard