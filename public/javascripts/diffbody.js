var randomjson = require('randomjson');

function findKey (obj,value, compare = (a, b) => a === b) {
    return Object.keys(obj).find(k => compare(obj[k], value))
}

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
            return '<@ [0]|[100-99999999]|>';
        }
        if(typeof value === 'string'){
            return '<@ string{1,50}|chinese{4,10}>'
        }
        if(typeof value === 'boolean'){
            return '<@ boolean>';
        }
        return value;

    });

    return randomjson(modeljson);
}

function diffarray(respdata){
    modeljson = JSON.parse(respdata,function (key,value) {
        if(value instanceof Array){
            return findKey(respdata,value)+ '<@{10,25}>',value;
        }
        return key,value;
    });
    console.log(modeljson);
    return randomjson(modeljson);
}

module.exports= {
    diffstrict : diffstrict,
    difffree : difffree,
    diffarray : diffarray
};
