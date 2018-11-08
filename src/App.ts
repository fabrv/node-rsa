import * as express from 'express'
import * as path from 'path'
class App{  
  public app: express.Application
  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')))
  }
}