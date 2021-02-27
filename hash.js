//导入bcryptjs
var bcryptjs = require('bcryptjs');



async function run() {
    //只能在异步
    //生成随机字符串 数值越大字符串越复杂

    const salt = await bcryptjs.genSalt(10);
    //对密码进行加密
    //1.要进行加密的明文
    //2.随机的字符串
    const result = await bcryptjs.hash('123456', salt);
}
run()