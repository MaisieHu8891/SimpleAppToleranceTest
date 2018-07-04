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
    let tmpdata  = JSON.stringify(respdata);
    console.log(tmpdata);
    let regExp =/\w+(?=":\[)/ ;
    if(tmpdata.match(regExp).length>=1){
        let changemod = b.match(regExp)[0]+'<@{10,20}>';
        //console.log(changemod);
        tmpdata = tmpdata.replace(regExp,changemod);
        let modeljson= JSON.parse(tmpdata);
        return randomjson(modeljson);
    }
    return randomjson(respdata);
}

module.exports= {
    diffstrict : diffstrict,
    difffree : difffree,
    diffarray : diffarray
};
