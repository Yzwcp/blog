const express = require('express');

//1.1创建博客展示页面路由
const home = express.Router(); 

home.get('/' ,require('./home/default'))
home.get('/article' ,require('./home/article'))
//跳转用户登录页面
// home.get('/login' ,require('./home/loginPage'))
//跳转注册用户
home.get('/register', require('./home/registerPage'))
//添加用户
// home.post('/login', require('./home/login'))
//注册
home.post('/register', require('./home/register'))
//创建评论功能路由
home.post('/comment',require('./home/comment'))
//1.2
module.exports = home;
