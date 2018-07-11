/**
 * 根据接口返回的json,自动随机修改json字段的值：
 * 在test.js中修改
 * const options = {
    ...
    rule: require('../javascripts/diffdatarule.js'),
    ...
 * */
let opurl= require('./opurl.js');
let diffbody = require('./diffbody.js');
module.exports = {
    summary: 'a rule to hack response',
    *beforeSendResponse(requestDetail, responseDetail) {
        let urlop = new opurl(requestDetail.url);
        let wurl = urlop.filterurl();
        if (wurl !== null) {
            console.log(requestDetail.url);
            let newResponse = responseDetail.response;
            let initbody = newResponse.body.toString();
            console.log('原始返回的数据:'+initbody);

            //注意：每次修改模式需重新运行test.js才会生效：

            //加载宽松模式的数据，不会返回err null 等内容
            let newbody = diffbody.difffree(initbody);
            //加载严格模式的数据，会返回err null 等内容
            //let newbody = diffbody.diffstrict(initbody);
            //加载返回多个数组的模式，在有list的json中使用
            //let newbody = diffbody.diffarray(initbody);
            newResponse.body = JSON.stringify(newbody);
            console.log('diff后的数据：'+newResponse.body);
            return new Promise((resolve, reject) => {
                setTimeout(() => { // delay
                    resolve({ response: newResponse });
                    }, 1000);
                });
            }
        },
    }