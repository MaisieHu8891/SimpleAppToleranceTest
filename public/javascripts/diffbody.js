var randomjson = require('randomjson');

//参数respdata是string类型
function diffstrict(respdata){
    var modeljson = JSON.parse(respdata,function (key,value) {

        if(typeof value ==='number'){
            return '<@ [0]|null|[100-99999999]|[1.00-9.00]>';
        }
        if(typeof value === 'string'){
            return '<@ null|string{0,20}|chinese{4,10}>'
        }
        if(typeof value === 'boolean'){
            return '<@ boolean|[0-1]|null|string{0}>';
        }
        return value;

    });
    return randomjson(modeljson);
}

function difffree(respdata){
    var modeljson = JSON.parse(respdata,function (key,value) {
        if(typeof value ==='number' && key !=='errno'){
            return '<@ [0]|[100-99999999]>';
        }

        if(typeof value === 'string'){
            return '<@ string{1,50}|chinese{4,10}>'
        }//&& value.indexOf('http')!==0

        if(typeof value === 'boolean'){
            return '<@ boolean>';
        }
        return value;

    });

    return randomjson(modeljson);
}

function diffarray(respdata){
    console.log(respdata);
    let regExp =/\w+(?=":\[)/ ;
    let keyw = respdata.match(regExp);
    if(keyw!=null){
        let changemod = respdata.match(regExp)[0]+'<@{20,30}>';
        respdata = respdata.replace(regExp,changemod);
        console.log('hit array');
        let modeljson= JSON.parse(respdata);
        return randomjson(modeljson);
    }
    return JSON.parse(respdata);
}

module.exports= {
    diffstrict : diffstrict,
    difffree : difffree,
    diffarray : diffarray
};
