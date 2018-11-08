import RSA from './RSA'
import chalk from 'chalk'
import bigInt from 'big-integer';

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
    try {
      const keys = RSA.generate(parseInt(chunk.toString()))
      const encrypt = RSA.encrypt(bigInt(200), keys.n, keys.e)
      const decrypt = RSA.decrypt(encrypt, keys.d, keys.n)
      console.log(chalk.magenta('=======LLAVES======='))
      console.log(keys)
      console.log(chalk.cyan('=====ENCRIPCION======'))
      console.log(encrypt)
      console.log(chalk.yellow('====DESENCRIPCION===='))
      console.log(decrypt)
    } catch (error) {
      console.log(chalk.red(error))
    }
  }
});