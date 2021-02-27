//1.导入express
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const dateFormat = require('dateformat');
const { template } = require('express-art-template');

//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;
//3.开放静态资源
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
//3.1 告诉espress框架 模板引擎的模板位置在哪 //第一个views为express的 第二个为模板位置
app.set('views',path.join(__dirname,'views'))
//3.2告诉express框架默认后缀
app.set('view engine', 'art');
//3.3 当渲染后缀为art的模板时 要用的模板是什么 ，因为express不止模板引擎一个模板
app.engine('art',require('express-art-template'))
//从3.3开始直接 7.1课时 导入数据库模块
require('./model/connect');
//8.初始化一个用户 user.js
//9.登录判断 common.js  login,art
//10.登录路由
// 10.1处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
//15 导入express-session模块
const session = require('express-session');
//配置session
app.use(session({
    secret: 'secret key',
    resave: false, //添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项
    //设置cookie过期时间
    cookie: {
        maxAge:24 * 60 * 60 *1000
    }
}))
//1.3导入home admin模块
const admin = require('./router/admin');
const home = require('./router/home');
const { nextTick } = require('process');

//19 拦截请求判断登录状态
app.use('/admin',require('./middleware/loginGuard') )
//2.为路由匹配请求路劲
app.use('/home', home);
app.use('/admin', admin);




app.listen(3000);
console.log('网站服务器启动成功');
