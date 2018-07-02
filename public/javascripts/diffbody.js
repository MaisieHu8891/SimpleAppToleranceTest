function diffbody(respdata) {
    let dataarray = [];
    let initdata = JSON.parse(respdata);
    let firstdata = JSON.parse(respdata, function (key, value) {
        if (typeof value === 'string' && key !== "errmsg") {
            return 'null';
        }
        return value;
    });
    //let firstdata = JSON.stringify(firstrule);
    let seconddata =JSON.parse(respdata, function (key, value) {
        if (typeof value === 'string') {
            return '';
        }
        return value;
    });
    // let seconddata = JSON.stringify(secondrule);
    dataarray.push(initdata, firstdata, seconddata);
    /////
    var idx = parseInt(Math.random()*1000)%dataarray.length;
    return dataarray[idx];
}


module.exports= diffbody;
