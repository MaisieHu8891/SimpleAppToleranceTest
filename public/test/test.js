'use strict'
const AnyProxy = require('anyproxy');
const options = {
    port: 8001,
    rule: require('C:\\Users\\hjx19\\WebstormProjects\\AppFaultToleranceTest\\public\\javascripts\\proxyrule.js'),
    webInterface: {
        enable: true,
        webPort: 8002
    },
    forceProxyHttps: true,
    wsIntercept: true,
    dangerouslyIgnoreUnauthorized:true,
    silent: true
};
const proxyServer = new AnyProxy.ProxyServer(options);

const exec = require('child_process').exec;
if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
    AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
        // let users to trust this CA before using proxy
        if (!error) {
            const certDir = require('path').dirname(keyPath);
            console.log('The cert is generated at', certDir);
            const isWin = /^win/.test(process.platform);
            if (isWin) {
                exec('start .', { cwd: certDir });
            } else {
                exec('open .', { cwd: certDir });
            }
        } else {
            console.error('error when generating rootCA', error);
        }
    });
}

proxyServer.on('ready', () => { /* */ });
proxyServer.on('error', (e) => { /* */ });
proxyServer.start();
console.log('代理开始');

//when finished
//proxyServer.close();

