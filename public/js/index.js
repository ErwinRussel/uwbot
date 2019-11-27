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
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        var data = {
            username: username, 
            password: password
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

// uilog, send messages to the user
function logUi(message){
    $('#uiLog').text(message);
}










