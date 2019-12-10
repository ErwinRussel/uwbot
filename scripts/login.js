var request = require("request");

class Login{
    constructor(arg){
        console.log(arg);
    }

    static getLogin = function(username, password){
        var options = { method: 'POST',
        url: 'https://unitedwardrobe.com/api/login',
        headers: 
        { 
            'cache-control': 'no-cache',
            'x-device-id': '048e8d1d-2adb-4cfc-a5c7-d76639c5f9b1',
            'x-device': '1680x947 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'x-locale': 'nl_NL',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-platform': 'Web',
            origin: 'https://unitedwardrobe.com',
            'x-version': '4.0.0' },
        body: 
        { username: username,
            password: password,
            inviter_id: null },
        json: true };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body);
            });
        });
    }
}

module.exports = Login;

