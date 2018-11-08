import { createServer, Server } from 'http'
import express from 'express'
import cors from 'cors'
import * as path from 'path'

import RSA from './RSA'
import chalk from 'chalk';
import bigInt from 'big-integer'


class App{  
  public server: Server
  public app: express.Application
  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')))
    // Mount extra routes
    this.mountRoutes()
    // Http Server
    this.server = createServer(this.app)
  }


  private mountRoutes(): void {
    const router: any = express.Router()

    // CORS module to allow cross origin resource sharing
    router.use(cors())

    router.get('/keys/:seed', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`LLaves pedidas con tamaño ${req.params.seed}`))
      res.status(200).send(RSA.generate(parseInt(req.params.seed)))
    })
    
    router.get('/encrypt/:message/:n/:e', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Encriptando mensaje ${req.params.message} con llave (${req.params.n}, ${req.params.e})`))
      const message: string = req.params.message
      const n: string = req.params.n
      const e: string = req.params.e
      let encrypt: Array<string> = [];

      for (let i = 0; i < message.length; i++){
        encrypt.push(RSA.encrypt(bigInt(message.charCodeAt(i)),bigInt(n),bigInt(e)).toString())
      }

      res.status(200).send(encrypt)
    })


    router.get('/decrypt/:message/:d/:n', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Desencriptando codigo ${req.params.message} con llave (${req.params.d}, ${req.params.n})`))
      const code: Array<string> = JSON.parse(req.params.message)
      const d: string = req.params.d
      const n: string = req.params.n
      let message: string = "";

      for (let i = 0; i < code.length; i++){
        message += String.fromCharCode(parseInt(RSA.decrypt(bigInt(code[i]),bigInt(d),bigInt(n)).toString()))
      }
      res.status(200).send({'message': message})
    })

    // Set router location
    this.app.use('/', router)
  }
}

//Exportar app
export default new App()