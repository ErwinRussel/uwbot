var request = require("request");

var retResponse = [];

module.exports = class Follower {
    constructor(arg){
        console.log(arg);
    }

    static followerCall = async function(base64token, user_id, limit, offset){
        var options = { method: 'POST',
        url: 'https://unitedwardrobe.com/api/user/followers',
        headers: 
        { 
            'cache-control': 'no-cache',
            'x-device-id': '048e8d1d-2adb-4cfc-a5c7-d76639c5f9b1',
            'x-device': '1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            authorization: 'Basic ' + base64token,
            'x-locale': 'nl_NL',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-platform': 'Web',
            origin: 'https://unitedwardrobe.com',
            'x-version': '4.0.0' },
        body: { limit: limit, offset: offset, user_id: user_id },
        json: true };
        
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body.users);
            });  
        });
    }

    static followingCall = async function(base64token, user_id, limit, offset){
        var options = { method: 'POST',
        url: 'https://unitedwardrobe.com/api/user/following',
        headers: 
        { 
            'cache-control': 'no-cache',
            'x-device-id': '048e8d1d-2adb-4cfc-a5c7-d76639c5f9b1',
            'x-device': '1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            authorization: 'Basic ' + base64token,
            'x-locale': 'nl_NL',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-platform': 'Web',
            origin: 'https://unitedwardrobe.com',
            'x-version': '4.0.0' },
        body: { limit: limit, offset: offset, user_id: user_id },
        json: true };
        
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body.users);
            });  
        });
    }



    static getFollowers = async function(token, amount, user_id) { // Amount needs to be decided somewhere
        // Create Base64 token
        let buff = new Buffer.from(token);
        let base64token = buff.toString('base64');

        var loop = Math.ceil(amount / 500);
        var trim = amount % 500;

        retResponse = [];

        for(var i = 0; i < loop; i++){
            if(i<loop-1){
                var limit = 500;
            } else {
                var limit = trim;
            }

            retResponse = retResponse.concat( await Follower.followerCall(base64token, user_id, limit, i*500));
        }

        return await Promise.all(retResponse);

    }

    static getFollowing = async function(token, amount, user_id) { // Amount needs to be decided somewhere
        // Create Base64 token
        let buff = new Buffer.from(token);
        let base64token = buff.toString('base64');

        var loop = Math.ceil(amount / 500);
        var trim = amount % 500;

        retResponse = [];

        for(var i = 0; i < loop; i++){
            if(i<loop-1){
                var limit = 500;
            } else {
                var limit = trim;
            }

            retResponse = retResponse.concat( await Follower.followingCall(base64token, user_id, limit, i*500));
        }

        return await Promise.all(retResponse);
    }
}