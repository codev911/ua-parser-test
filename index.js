const http = require('http');
const uap = require('ua-parser-js');

http.createServer(function (req, res) {
    const userDeviceInfo = {
		platform: 'Unknown',
		browser: 'Unknown',
		browser_major_version: 'Unknown',
		engine: 'Unknown',
		engine_major_version: 'Unknown',
		is_mobile: false,
	};

    if (
        (req.headers['user-agent'] && typeof req.headers['user-agent'] === 'string') &&
        (req.headers['sec-ch-ua'] && typeof req.headers['sec-ch-ua'] === 'string') &&
        (req.headers['sec-ch-ua-mobile'] && typeof req.headers['sec-ch-ua-mobile'] === 'string') && 
        (req.headers['sec-ch-ua-platform'] && typeof req.headers['sec-ch-ua-platform'] === 'string')
    ) {
        userDeviceInfo.platform = req.headers['sec-ch-ua-platform'].replace(/"/g, '');
        userDeviceInfo.is_mobile = req.headers['sec-ch-ua-mobile'] === '?1' ? true : false;
        const parseData = req.headers['sec-ch-ua'].split(', ');
		const parseDataBrowser = parseData[0] ? parseData[0].split(';v=') : ['Unknown', 'Unknown'];
		const parseDataEngine = parseData[1] ? parseData[1].split(';v=') : ['Unknown', 'Unknown'];

		userDeviceInfo.browser = parseDataBrowser[0] ? parseDataBrowser[0].replace(/"/g, '') : 'Unknown';
		userDeviceInfo.browser_major_version = parseDataBrowser[1] ? parseDataBrowser[1].replace(/"/g, '') : 'Unknown';
		userDeviceInfo.engine = parseDataEngine[0] ? parseDataEngine[0].replace(/"/g, '') : 'Unknown';
		userDeviceInfo.engine_major_version = parseDataEngine[1] ? parseDataEngine[1].replace(/"/g, '') : 'Unknown';

        res.end(JSON.stringify({
            result: userDeviceInfo,
            debug: {
                "user-agent": req.headers['user-agent'],
                "sec-ch-ua-mobile": req.headers['sec-ch-ua-mobile'],
                "sec-ch-ua-platform": req.headers['sec-ch-ua-platform'],
                "sec-ch-ua": req.headers['sec-ch-ua'],
            }
        }, null, '  '));
    } else if (
        (req.headers['user-agent'] && typeof req.headers['user-agent'] === 'string') &&
        !req.headers['sec-ch-ua'] &&
        !req.headers['sec-ch-ua-mobile'] &&
        !req.headers['sec-ch-ua-platform']
    ) {
        let ua = uap(req.headers['user-agent']);
        userDeviceInfo.platform = ua.os?.name ? ua.os.name : "Unknown";
        userDeviceInfo.browser = ua.browser?.name ? ua.browser.name : "Unknown";
        userDeviceInfo.browser_major_version = ua.browser?.major ? ua.browser.major : "Unknown";
        userDeviceInfo.engine = ua.engine?.name ? ua.engine.name : "Unknown";
        userDeviceInfo.engine_major_version = ua.engine?.version ? ua.engine.version : "Unknown";
        userDeviceInfo.is_mobile = ua.device?.type === "mobile" ? true : false;

        res.end(JSON.stringify({
            result: userDeviceInfo,
            debug: {
                "user-agent": req.headers['user-agent'],
                "sec-ch-ua-mobile": req.headers['sec-ch-ua-mobile'],
                "sec-ch-ua-platform": req.headers['sec-ch-ua-platform'],
                "sec-ch-ua": req.headers['sec-ch-ua'],
            }
        }, null, '  '));
    } else {
        res.end(JSON.stringify({
            result: userDeviceInfo,
            debug: {
                "user-agent": req.headers['user-agent'],
                "sec-ch-ua-mobile": req.headers['sec-ch-ua-mobile'],
                "sec-ch-ua-platform": req.headers['sec-ch-ua-platform'],
                "sec-ch-ua": req.headers['sec-ch-ua'],
            }
        }, null, '  '));
    }
})
.listen(1337);

console.log('Server running at http://localhost:1337/');