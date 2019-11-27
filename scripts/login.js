url = "https://unitedwardrobe.com/api/login"

headers = {
    'x-version': "4.0.0",
    'origin': "https://unitedwardrobe.com",
    'x-uw-session-id': "atz8eSF6cCL2czndwU1XP3ufo",
    'x-platform': "Web",
    'content-type': "application/json",
    'accept': "application/json, text/plain, ",
    'x-locale': "nl_NL",
    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    'x-device': "1680x947 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
    'cache-control': "no-cache",
    'postman-token': "4c5ae199-c0b1-24e3-fb0c-63feb36c3425"
}

module.exports = class Login{
    constructor(arg){
        console.log(arg);
    }

    function getToken(self, username, password){
        var payload = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"inviter_id\":null}"
        response = requests.request("POST", url, data=payload, headers=headers)
        return response.json()
    }
}

