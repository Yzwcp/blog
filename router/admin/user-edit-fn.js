//导入User validateUser 模块
const { User, validateUser } = require('../../model/user')

var bcryptjs = require('bcryptjs');
module.exports = async (req, res) => {
    //定义对象验证规则
    
    // 验证
    try {
       await validateUser(req.body)
    } catch (e) {
     return  res.redirect(`/admin/user-edit?message=${e.message}`)
       
    }
    
    //根据邮箱地址查询是否存在
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return  res.redirect(`/admin/user-edit?message=邮箱地址被占用`)
       
    }
    //密码加密
    const salt = await bcryptjs.genSalt(10);
    const pass = await bcryptjs.hash(req.body.password, salt);
    //把要传入数据库的密码 替换成加密后的pass
    req.body.password = pass
    //添加到数据库
    await User.create(req.body)
    
    res.redirect('/admin/user')
    
}