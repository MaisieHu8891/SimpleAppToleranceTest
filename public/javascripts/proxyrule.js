//let async = require('async');
let opurl= require('C:\\Users\\hjx19\\WebstormProjects\\AppFaultToleranceTest\\public\\javascripts\\opurl.js');
//let opdb = require('C:\\Users\\hjx19\\WebstormProjects\\AppFaultToleranceTest\\public\\javascripts\\opdb.js');
let diffbody = require('C:\\Users\\hjx19\\WebstormProjects\\AppFaultToleranceTest\\public\\javascripts\\diffbody.js');

module.exports = {
    summary: 'a rule to hack response',
    *beforeSendResponse(requestDetail, responseDetail) {
        let urlop = new opurl(requestDetail.url);
        let wurl = urlop.filterurl();
        if (wurl !== null) {
            console.log(requestDetail.url);
            let newResponse = responseDetail.response;
            let initbody = newResponse.body.toString();
            //wurl = urlop.formaturl();
            //let mydb = new opdb(wurl,initbody);
            let newbody = diffbody(initbody);
            newResponse.body = JSON.stringify(newbody);
            console.log(newResponse.body);
            return new Promise((resolve, reject) => {
                setTimeout(() => { // delay
                    resolve({ response: newResponse });
                    }, 1000);
                });
            }

        },

    }