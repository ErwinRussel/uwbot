var request = require("request");

class Login{
    constructor(arg){
        console.log(arg);
    }

    static getLogin = function(username, password){
        var options = { method: 'POST',
        url: 'https://unitedwardrobe.com/api/login',
        headers: 
        { 'postman-token': '5012c104-be45-0214-b81a-43c73546a452',
            'cache-control': 'no-cache',
            'x-device-id': '0361a35b-47e0-4474-82a2-c44a0ac22505',
            'x-device': '1680x947 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'x-locale': 'nl_NL',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-platform': 'Web',
            'x-uw-session-id': 'atz8eSF6cCL2czndwU1XP3ufo',
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

