/**
 * 返回404、502等错误码：
 * 在test.js中修改
 * const options = {
    ...
    rule: require('../javascripts/statuscoderule.js'),
    ...
 * */
module.exports = {
    *beforeSendResponse(requestDetail, responseDetail) {
        let urlop = new opurl(requestDetail.url);
        let wurl = urlop.filterurl();
        if (wurl !== null) {
            console.log(requestDetail.url);
            const newResponse = responseDetail.response;
            newResponse.statusCode = 404;
            return {
                response: newResponse
            };
        }
    }
};