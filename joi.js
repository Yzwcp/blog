const joi = require('joi');

//定义对象验证规则
const schema = {
    username: joi.string().min(2).required().max(5).error(new Error('username没有通过验证'))
    ,birth:joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
};
//实施验证

async function run() {
    try {
        await joi.validate({ username: 't1',birth:2100} ,schema)
    } catch (ex) {
        console.log(ex.message);
        return
}

console.log('验证通过');
}
run()