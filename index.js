const http = require('http');
const uap = require('ua-parser-js');

http.createServer(function (req, res) {
    // get user-agent header
    let ua = uap(req.headers['user-agent']);

    /* 
    // Since v2.0.0
    // you can also pass Client Hints data to UAParser
    // note: only works in a secure context (localhost or https://)
    // from any browsers that are based on Chrome 85+
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA

        const getHighEntropyValues = 'Sec-CH-UA-Full-Version-List, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Bitness';
        res.setHeader('Accept-CH', getHighEntropyValues);
        res.setHeader('Critical-CH', getHighEntropyValues);
        
        ua = uap(req.headers).withClientHints();
    */

    // write the result as response
    res.end(JSON.stringify(ua, null, '  '));
})
.listen(1337);

console.log('Server running at http://localhost:1337/');