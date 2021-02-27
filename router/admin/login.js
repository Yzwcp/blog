var bcryptjs = require('bcryptjs');
const {User} = require('../../model/user');

const login = async (req, res) => {
    // res.send(req.body)
    // 解构req.body
    const { email, password } = req.body;
    if (email.trim().length  == 0 || password.trim().length==0 ) {
        return res.status(400).render('admin/err', {msg:'邮箱或者密码错误'}) 
    }
    //根据用户邮箱查询数据库
    //如果查询到了用户 user的类型为对象 负责为空
    let user = await User.findOne({ email: email });
    if (user) {
        //查询到用户
        // 密码比对 possword为明文密码 user.为加密密码
        let isValid =  await bcryptjs.compare(password,user.password)
        if (isValid) {
            //登陆成功
            //存取登录用户名
            req.session.username = user.username;
            req.session.role = user.role
            //在全局吧user直接赋值给locals 模板引擎可以直接渲染
            req.app.locals.usermsg = user;
            //对用户角色进行判断
            if (user.role == 'admin') {
                      //重定向
                res.redirect('/admin/user')
            } else {
                res.redirect('/home')
            }
          
        } else {
            //登录失败
            res.status(400).render('admin/err',{msg:'邮箱地址或者密码错误'})
        }
            
    } else {
        //没有查询到
    res.status(400).render('admin/err',{msg:'邮箱地址或者密码错误'})
    }
        
}
module.exports = login