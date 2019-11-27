

const followerUrl = "https://unitedwardrobe.com/api/user/followers"
const followUrl = "https://unitedwardrobe.com/api/follow"

module.exports = class Follow {
    constructor(arg){
        console.log(arg);
    }

    function followUser(self, token, user) {

        followPayload = "{\"follow_id\":\"" + str(user) + "\"}"

        follow_headers = {
            'x-version': "4.0.0",
            'origin': "https://unitedwardrobe.com",
            'x-uw-session-id': "atz8eSF6cCL2czndwU1XP3ufo",
            'x-platform': "Web",
            'content-type': "application/json",
            'accept': "application/json, text/plain, */*",
            'x-locale': "nl_NL",
            'authorization': "Basic ZXJ3aW5ydXNzZWxfOTExMzE6N2U4OGU2NjJiOTFlYzk2Nzk3MDNkYmQ2YzNlNThiMDgyYmVkZTc2NjcxZmUyNTYyMGNiMGJhMWQwNzNhODNmOA==",
            'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            'x-device': "1258x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
            'cache-control': "no-cache",
            'postman-token': "7a642c93-bea0-90b1-ba25-e067e68ac5f3"
        }

        response = requests.request("POST", follow_url, data=follow_payload, headers=follow_headers)

        print(response.text)   
    } 


    function followFollowers(self, token, amount, user_id) {

        var loopSize = amount/500 // fix dit

        for(i = 0; i < loopSize; i++){
            payload = "{\"limit\":500,\"offset\":" + str(i*500) + ",\"user_id\":\"" + user_id + "\"}"
            headers = {
                'x-version': "4.0.0",
                'origin': "https://unitedwardrobe.com",
                'x-uw-session-id': "atz8eSF6cCL2czndwU1XP3ufo",
                'x-platform': "Web",
                'content-type': "application/json",
                'accept': "application/json, text/plain, */*",
                'x-locale': "nl_NL",
                'authorization': "Basic " + str(base64.b64encode(token.encode("utf-8"))),
                'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
                'x-device': "1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
                'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
                'cache-control': "no-cache",
                'postman-token': "67aaacf2-4db8-d02c-508e-795f735fd163"
                }

            response = requests.request("POST", follower_url, data=payload, headers=headers)

            retJSON = response.json();
            console.log(retJSON['users'].length)
            for(user in retJSON['users']){
                followUser(token, user["user_id"])
            }
        }
    }
}
    