
const followerUrl = "https://unitedwardrobe.com/api/user/followers"
const followingUrl = "https://unitedwardrobe.com/api/user/following"
const unfollowUrl = "https://unitedwardrobe.com/api/follow/defollow"

module.exports = class unFollow {
    constructor(arg){
        console.log(arg);
    }

    function unfollow_user(token, user){

        var unfollowPayload = "{\"follow_id\":\"" + str(user) + "\"}"

        unfollowHeaders = {
            'x-version': "4.0.0",
            'origin': "https://unitedwardrobe.com",
            'x-uw-session-id': "atz8eSF6cCL2czndwU1XP3ufo",
            'x-platform': "Web",
            'content-type': "application/json",
            'accept': "application/json, text/plain, */*",
            'x-locale': "nl_NL",
            'authorization': "Basic ZXJ3aW5ydXNzZWxfOTExMzE6N2U4OGU2NjJiOTFlYzk2Nzk3MDNkYmQ2YzNlNThiMDgyYmVkZTc2NjcxZmUyNTYyMGNiMGJhMWQwNzNhODNmOA==",
            'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            'x-device': "1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
            'cache-control': "no-cache",
            'postman-token': "67aaacf2-4db8-d02c-508e-795f735fd163"
            }

        response = requests.request("POST", unfollow_url, data=unfollow_payload, headers=unfollow_headers)

        print(response.text)   
    } 


    function unfollow(token, user_id, amount){

        var loopSize = int(amount/500) # fix dit

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
                'authorization': "Basic ZXJ3aW5ydXNzZWxfOTExMzE6N2U4OGU2NjJiOTFlYzk2Nzk3MDNkYmQ2YzNlNThiMDgyYmVkZTc2NjcxZmUyNTYyMGNiMGJhMWQwNzNhODNmOA==",
                'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
                'x-device': "1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
                'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
                'cache-control': "no-cache",
                'postman-token': "67aaacf2-4db8-d02c-508e-795f735fd163"
                }

            response = requests.request("POST", following_url, data=payload, headers=headers)

            retJSON = response.json()
            print(retJSON['users'].length)
            for(user in retJSON['users']){
                self.unfollowUser(token, user["user_id"])
            }
        }
    }

    function unfollowFollowers(self, token, user_id){
        payload = "{\"limit\":500,\"offset\":0,\"user_id\":\"" + user_id + "\"}"
            
        headers = {
            'x-version': "4.0.0",
            'origin': "https://unitedwardrobe.com",
            'x-uw-session-id': "atz8eSF6cCL2czndwU1XP3ufo",
            'x-platform': "Web",
            'content-type': "application/json",
            'accept': "application/json, text/plain, */*",
            'x-locale': "nl_NL",
            'authorization': "Basic ZXJ3aW5ydXNzZWxfOTExMzE6N2U4OGU2NjJiOTFlYzk2Nzk3MDNkYmQ2YzNlNThiMDgyYmVkZTc2NjcxZmUyNTYyMGNiMGJhMWQwNzNhODNmOA==",
            'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            'x-device': "1920x1000 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            'x-device-id': "0361a35b-47e0-4474-82a2-c44a0ac22505",
            'cache-control': "no-cache",
            'postman-token': "67aaacf2-4db8-d02c-508e-795f735fd163"
        }

        response = requests.request("POST", follower_url, data=payload, headers=headers)

        retJSON = response.json()
        print(len(retJSON['users']))
        for(user in retJSON['users']){
            self.unfollow_user(token, user["user_id"])
        }
    }
}