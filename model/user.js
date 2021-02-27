const mongoose = require('mongoose');
const { use } = require('../router/home');
const joi = require('joi');
var bcryptjs = require('bcryptjs');
//第二步

//数据库连接 27017默认端口

//5.1创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //必选
        required: true,
        minlength: 2,
        maxlength:20
    },
    age: {
        type: Number,
        min: 18,
        max:80
    },
    password: {
        type: String,
        required:true
    },
    email: {
        type: String,
        //保证邮箱地址不重复
        unique:true,
    },
        //admin 超级管理员  normal普通用户
    role: {
        type: String,
        required:true
    },
    //0为启用状态 1禁用状态
    state: {
        type: Number,
        default: 0
    }
})
//5.2创建集合
const User = mongoose.model('User', userSchema)
//5.3初始化一个用户
async function createUser() {
    const salt = await bcryptjs.genSalt(10);
    const pass = await bcryptjs.hash('123456', salt)
    const user = await User.create({
        username: "超级管理员",
        email: '1774570823@qq.com',
        password:  pass,
        role: 'admin',
        state:0
        
    })
    
}
// createUser();

//验证用户信息
const validateUser = (user) => {
    //定义验证规则
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error('用户名填写不正确'))
        , email: joi.string().email().required().error(new Error('邮箱不符合规则'))
        , password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求'))
        , role: joi.string().valid('normal', 'admin').required().error(new Error('角色不符合规则')),
         state: joi.string().valid('0', '1').required().error(new Error('状态不符合规则')),
       
    }  
   return  joi.validate(user, schema)
}

//验证用户信息
// const register = (user) => {
//     //定义验证规则
//     const reschema = {
//             email: joi.string().email().required().error(new Error('邮箱不符合规则'))
//              , password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求'))
//              , password_two: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求'))
      
       
//     }  
//    return  joi.validate(user, reschema)
// }
module.exports = {
    User: User,
    // register:register,
    validateUser:validateUser
}
