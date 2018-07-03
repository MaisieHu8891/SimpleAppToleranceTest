yaml = require('js-yaml');
fs   = require('fs');

class Opurl{
    constructor(url){
        this.url = url; //客户端请求的url
        this.filterurl=this.filterurl.bind(this);
    }

    filterurl(){
        try {
            let urlarray = yaml.safeLoad(fs.readFileSync('..\\data\\urlwhite.yml','utf8'));
            for(let i = 0; i < urlarray.length; i++){
                let urlwhite = urlarray[i];
                if(this.url.indexOf(urlwhite) === 0){
                    //console.log(this.url);
                    return urlwhite;
                }
            }
            return null;
        } catch (e) {
            console.log(e);
            return null
        }
    }
}

module.exports= Opurl;