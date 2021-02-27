const {User} = require('../../model/user');

module.exports = async (req, res) => {
 
//    res.send(user)
    //当前页面
    let page = req.query.page || 1;
    //每一页现实的数据条数
    let pagesize = 6;
    //查询用户总数据总数
    let count = await User.countDocuments({});
    console.log(count);
    //总页数
    let total = Math.ceil(count/pagesize)
    //limit 限制查询数量，传入每页显示的数据量
    //skip 跳过多少跳数据  传入显示数据的起始位置 
    let start = (page-1)*pagesize

    //查询全部成员
    let user = await User.find({}).limit(pagesize).skip(start);
    console.log(req.session.username);
    res.render('admin/user', {
        user: user,
        page: page,
        total:total
    })
}