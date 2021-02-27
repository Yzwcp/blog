const { connect } = require('mongoose');
const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    const page  = req.query.page
    let article = await Article.findOne({ _id: req.query.id }).populate('author')
    // let comment = await pagination(Comment).find({aid:req.query.id}).page(page).size(4).display(4).populate('uid').exec()
    let comment = await Comment.find({aid:req.query.id}).populate('uid')
    
    article = JSON.stringify(article);
    article = JSON.parse(article); 
    comment = JSON.stringify(comment);
    comment = JSON.parse(comment); 
   
    res.render('home/article', {
        article: article,
        comment:comment
    })
}