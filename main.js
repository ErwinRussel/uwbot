// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Get the scripts
var Login = require('./scripts/login');
var Follower = require('./scripts/follower');
var Follow = require('./scripts/follow');
var Unfollow = require('./scripts/unfollow');

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    icon: __dirname + '/uwicon.icns',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('views/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

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

  let response = await Login.getLogin(data.username, data.password);
  // Try to get token 
  if(response.success==false){
    mainWindow.webContents.send('log', response.msg);
    return;
  } else if(response.success==true) {
    var token = response.token;
    mainWindow.webContents.send('log', 'Received Token') // This is maybe too fast
  }

  // FOLLOWING
  console.log(data.follow);
  if(data.follow){
    mainWindow.webContents.send('log', 'Collecting followers of user ' + data.userFollowers);
    let followers = await Follower.getFollowers(token, data.followAmount, userFollowers)
    mainWindow.webContents.send('log', 'Obtained ' + followers.length + ' followers');
    mainWindow.webContents.send('log', 'Start following');
    await Follow.follow(token, followers);
    mainWindow.webContents.send('log', 'Followed ' + ' users');
  }

  // UNFOLLOW FOLLOWERS
  console.log(data.unfollowFollowers);
  if(data.unfollowFollowers){
    mainWindow.webContents.send('log', 'Collecting your followers');
    let followers = await Follower.getFollowers(token, data.followAmount, response.id); // Change this to your own followers
    mainWindow.webContents.send('log', 'Obtained ' + followers.length + ' followers');
    mainWindow.webContents.send('log', 'Start following');
    await Follow.follow(token, followers);
    mainWindow.webContents.send('log', 'Followed ' + ' users');
  }

  // UNFOLLOW FOLLOWING
  console.log(data.unfollow);
  if(data.unfollow){
    mainWindow.webContents.send('log', 'Start unfollowing users');

  }

  mainWindow.webContents.send('log', 'Done');
  mainWindow.webContents.send('btn', 'Back');
});