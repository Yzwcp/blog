const { Article } = require('../../model/article')
//实现分页
const pagination = require('mongoose-sex-page');
module.exports =async (req, res) => {
    req.app.locals.currentLink = 'article';
    //接受客户端传递过来的page
    const page  = req.query.page
    //多级查询 与分页
    //page 指定当前页 第几页
    //pages 总页数
    //size 指定每页显示数量
    //total 总共数据
    //dispaly 指定客户端显示的页码
    //exec向数据库发送查询请求
    //records 数据项
    let articles = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();
    // res.send(fenye)
    articles = JSON.stringify(articles);
    articles = JSON.parse(articles); 
    res.render('admin/article', {
        articles: articles,
    })
}