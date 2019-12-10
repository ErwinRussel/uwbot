var request = require("request");

let promises = [];

module.exports = class Unfollow {
    constructor(arg){
        console.log(arg);
    }

    static unfollowUser = async function(base64token, userId) {
        var options = { method: 'POST',
        url: 'https://unitedwardrobe.com/api/follow/defollow',
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

    static unfollow = async function(token, users){
        let buff = new Buffer.from(token);
        let base64token = buff.toString('base64');

        let promises = [];

        for(const user of Object.keys(users)){
            promises.push( await Unfollow.unfollowUser(base64token, users[user].user_id));
        }

        return await Promise.all(promises);
    }


    // static unfollowFollowers(token, user_id){
    //     payload = "{\"limit\":500,\"offset\":0,\"user_id\":\"" + user_id + "\"}"
            
    //     headers = {
    //         'x-version': "4.0.0",
    //         'origin': "https://unitedwardrobe.com",
    //         'x-uw-session-id': "atz8eSF6cCL2czndwU1XP3ufo",
    //         'x-platform': "Web",
    //         'content-type': "application/json",
    //         'accept': "application/json, text/plain, */*",
    //         'x-locale': "nl_NL",
    //         'authorization': "Basic ZXJ3aW5ydXNzZWxfOTExMzE6N2U4OGU2NjJiOTFlYzk2Nzk3MDNkYmQ2YzNlNThiMDgyYmVkZTc2NjcxZmUyNTYyMGNiMGJhMWQwNzNhODNmOA==",
    //         'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    //         'x-device': "1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    //         'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
    //         'cache-control': "no-cache",
    //         'postman-token': "67aaacf2-4db8-d02c-508e-795f735fd163"
    //     }

    //     response = requests.request("POST", follower_url, data=payload, headers=headers)

    //     retJSON = response.json()
    //     print(len(retJSON['users']))
    //     for(user in retJSON['users']){
    //         self.unfollow_user(token, user["user_id"])
    //     }
    // }
}