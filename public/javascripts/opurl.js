yaml = require('js-yaml');
fs   = require('fs');

class Opurl{
    constructor(url){
        this.url = url; //客户端请求的url
    }

    formaturl(){
        return this.url.replace(/:/g,"_").replace(/\//g,"_").replace(/\\/g,"_").replace(/\?/g,"_").replace(/&/g,"_").replace(/=/g,"_");
    }

    filterurl(){
        try {
            let urlarray = yaml.safeLoad(fs.readFileSync('..\\data\\urlwhite.yml','utf8'));
            //获得待测试的URL数组console.log(urlarray);
            for(let i = 0; i < urlarray.length; i++){
                let urlwhite = urlarray[i];
                if(this.url.indexOf(urlwhite) === 0){
                    //console.log(this.url);
                    return urlwhite;
                }else {
                    return null;
                }
            }
        } catch (e) {
            console.log(e);
            return null
        }
    }
}

module.exports= Opurl;