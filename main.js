const { app, BrowserWindow } = require('electron')
const path = require('path')

process.env.NODE_ENV = 'production'

const isDev = process.env.NODE_ENV !== 'production'

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'Custom Kanban',
        height: isDev ? 1000 : 800,
        width: 1200 ,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    })

    mainWindow.setMenuBarVisibility(false)

    if(isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, 'src/index.html'))
}

app.whenReady().then(() => {
    createMainWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
      }
    })
  })
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})