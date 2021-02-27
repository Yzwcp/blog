//引入mongoose
const { required } = require('joi');
const mongoose = require('mongoose');
//创建文章规则
const articleSchma = new mongoose.Schema({
    title: {
        type: String,
        max: 20,
        min: 2,
        required: [true,'请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传入作者'],
        
    },
    publishDate: {
        type: Date,
      default:Date.now  
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type:String
    }
})
const Article = mongoose.model('Article',articleSchma)

module.exports = {
    Article:Article
}