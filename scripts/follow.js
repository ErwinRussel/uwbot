var request = require("request");

let promises = [];

module.exports = class Follow {
    constructor(arg){
        console.log(arg);
    }

    static followUser = async function(base64token, userId) {
        var options = { method: 'POST',
        url: 'https://unitedwardrobe.com/api/follow',
        headers: 
        { 
            'cache-control': 'no-cache',
            'x-device-id': '048e8d1d-2adb-4cfc-a5c7-d76639c5f9b1',
            'x-device': '1258x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            authorization: 'Basic ' + base64token,
            'x-locale': 'nl_NL',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-platform': 'Web',
            origin: 'https://unitedwardrobe.com',
            'x-version': '4.0.0' },
        body: { follow_id: userId },
        json: true };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
                resolve(body);
            });  
        });
    }

    static follow = async function(token, users){
        let buff = new Buffer.from(token);
        let base64token = buff.toString('base64');

        let promises = [];

        for(const user of Object.keys(users)){
            promises.push( await Follow.followUser(base64token, users[user].user_id));
        }

        return await Promise.all(promises);
    }


}
    