const { required } = require("joi")
const { Article} = require('../../model/article')
const formidable = require('formidable');
const path =require ('path')
module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //2.上传的路径存放
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    //3.设置是否保留上传文件的后缀
    form.keepExtensions = true;
    //4.解析表单
    form.parse(req, async(err,fields,files) => {
        //1.err错误对象
        //2.fields对象保存普通表单数据
        //3.files 对象类型 保存了文件上传相关数据
       
        // res.send( files.cover.path.split('public')[1]) 
      console.log( fields.author);
      await  Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content:fields.content
      })
           
        res.redirect('/admin/article')
    })
}