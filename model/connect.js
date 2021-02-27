const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(doc => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接错误'))