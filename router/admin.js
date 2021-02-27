const express = require('express');
//导入加密模块
//1.1创建博客展示页面路由
const admin = express.Router(); 
const { use } = require('./home');
//3.4 访问登录路由
admin.get('/login' ,require('./admin/loginPage'))
//10.登录 路由
admin.post('/login',require('./admin/login') )
//用户列表
admin.get('/user', require('./admin/userPage'))
//删除用户
admin.get('/delete', require('./admin/delete'))

//退出功能
admin.get('/logout', require('./admin/logOut'))
//  实现 添加用户 路由功能
admin.get('/user-edit',require('./admin/user-edit'))
// 实现添加用户
admin.get('/user', require('./admin/userPage'))
admin.post('/user-edit',require('./admin/user-edit-fn'))


//文章路由
admin.get('/article', require('./admin/article'))
// 文章发布路由
admin.get('/article-edit', require('./admin/article-edit'))
admin.post('/article-add', require('./admin/article-add'))
admin.get('/deleteArticle', require('./admin/deleteArticle'))




//1.2
module.exports = admin;