// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const Store = require('electron-store');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Get the scripts
const Login = require('./scripts/login');
const Follower = require('./scripts/follower');
const Follow = require('./scripts/follow');
const Unfollow = require('./scripts/unfollow');

// Instantiate Store Class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    userName: ""
  }
});

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    icon: path.join(__dirname, 'assets/uwicon.icns'),
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('views/index.html');
    // get username from store

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.send('usr', store.get('userName'));
  });
    
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// Catch the stuff from the submitform
ipcMain.on('form-submission', async function (event, data) {
  mainWindow.webContents.send('btn', 'Stop');
  mainWindow.webContents.send('log', 'Trying to log in');

  // Set the username in the appData
  store.set('userName', data.username);

  let response = await Login.getLogin(data.username, data.password);
  // Try to get token 
  if(response.success==false){
    mainWindow.webContents.send('log', response.msg);
    return;
  } else if(response.success==true) {
    var token = response.token;
    var uuid = response.user.id;
    var username = response.user.username;
    mainWindow.webContents.send('log', 'Received Token') // This is maybe too fast
  }

  // FOLLOWING
  if(data.follow){
    mainWindow.webContents.send('log', 'Collecting followers of user ' + data.userFollowers);
    let followers = await Follower.getFollowers(token, data.followAmount, data.userFollowers);
    mainWindow.webContents.send('log', 'Obtained ' + followers.length + ' followers');
    mainWindow.webContents.send('log', 'Start following');
    let followedamount = await Follow.follow(username+":"+token, followers).length;
    mainWindow.webContents.send('log', 'Followed ' + followedamount + ' users');
  }

  // UNFOLLOW FOLLOWERS
  if(data.unfollowFollowers){
    mainWindow.webContents.send('log', 'Collecting your followers');
    let unfollowers = await Follower.getFollowers(token, 10000, uuid); // Change the followamount to size own followers
    mainWindow.webContents.send('log', 'Obtained ' + unfollowers.length + ' followers');
    mainWindow.webContents.send('log', 'Start unfollowing');
    let unfollowedamount = await Unfollow.unfollow(username+":"+token, unfollowers).length;
    mainWindow.webContents.send('log', 'Followed ' + unfollowedamount + ' users');
  }

  // UNFOLLOW FOLLOWINGS
  if(data.unfollow){
    mainWindow.webContents.send('log', 'Collecting your followings');
    let followings = await Follower.getFollowing(token, data.unfollowAmount, uuid); // Change the followamount to size own followers
    mainWindow.webContents.send('log', 'Obtained ' + followings.length + ' followings');
    mainWindow.webContents.send('log', 'Start unfollowing');
    let unfollowdamount = await Unfollow.unfollow(username+":"+token, followings);
    mainWindow.webContents.send('log', 'unFollowed ' + ' users');

  }

  console.log(process._getActiveHandles());
  console.log(process._getActiveRequests());

  mainWindow.webContents.send('log', 'Done');
  mainWindow.webContents.send('btn', 'Back');
});