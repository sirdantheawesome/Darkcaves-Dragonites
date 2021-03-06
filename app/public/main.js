const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const { path } = require('path')

let mainWindow

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('ping: ', arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: __dirname + '/preload.js',
    }
  })

  //load the index.html from a url
  mainWindow.loadURL('http://localhost:3000');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const template = [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Pokedex',
        click: () => {
          mainWindow.webContents.send('pokedex-route')
        }
      },
      { label: 'Trainer' },
      { label: 'Pokemon' },
      { label: 'Bag' },
      { label: 'PC' },
    ]
  },
  {
    label: 'File',
    submenu: [
      // This opens the Dev Tools for the program
      {
        label: 'Dev Tools',
        click: () => {
          mainWindow.webContents.openDevTools()
        }
      },
      { label: 'Save' },
      { label: 'Load' },
      // {
      //   label: 'Google',
      //   click: () => {
      //     let win = new BrowserWindow({ width: 600, height: 800 })
      //     win.loadURL('https://www.google.com')
      //   }
      // },

      // creates a divider between two options
      { type: 'separator' },
      { role: 'copy' },
      { role: 'paste' },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'selectall' },
      { role: 'reload' }
    ]
  },
  {
    label: 'View',
  },
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)