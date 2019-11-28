const ipcRenderer = require('electron').ipcRenderer;

// Load JQuery
try {
    window.$ = window.jQuery = require("jQuery");
}
  catch(error) {
    alert(error);
}

// Enable and disable input fields
$(document).ready(function(){
    // Enable following parameters
    $('#enableFollow').click(function() {
        if (this.checked) {
        $('#userFollowers').prop("disabled", false);
        $('#userFollowAmount').prop("disabled", false);
        } else {
        $('#userFollowers').prop("disabled", true);
        $('#userFollowAmount').prop("disabled", true);
        }
    });

    // Enable unfollowing parameters
    $('#enableUnfollow').click(function() {
        if (this.checked) {
        $('#unfollowAmount').prop("disabled", false);
        } else {
        $('#unfollowAmount').prop("disabled", true);
        }
    });

    // Show processing screen when we start processing
    $('#parameterForm').submit(function(){
        event.preventDefault();
        // Send data
        let username = $("#username").val();
        let password = $("#password").val();
        let follow = $("#enableFollow").is(":checked");
        let userFollowers = $("#userFollowers").val();
        let followAmount = $("#userFollowAmount").val();
        let unfollowFollowers = $("#unfollowFollowers").is(":checked");
        let unfollow = $("#enableUnfollow").is(":checked");
        let unfollowAmount = $("#unfollowAmount").val();
        var data = {
            username: username, 
            password: password,
            follow: follow,
            userFollowers: userFollowers,
            followAmount: followAmount,
            unfollowFollowers: unfollowFollowers,
            unfollow: unfollow,
            unfollowAmount: unfollowAmount
        }
        ipcRenderer.send('form-submission', data)
        // Switch pages
        $('#main').hide();
        $('#process').show();
    });

    // Show main screen when pressed stop/back
    $('#stop').click(function(){
        $('#process').hide();
        $('#main').show();
    });
});

ipcRenderer.on('log', function (event, data) {
    $('#uiLog').text(data);
});

ipcRenderer.on('btn'), function (event, data) {
    $('#stop').val(data);
}













