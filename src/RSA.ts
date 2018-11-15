import bigInt from 'big-integer'
import { Spinner } from 'cli-spinner'
/**
 * Codigo basado en https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Code
 * Que a su vez está basado en https://github.com/kubrickology/Bitcoin-explained/blob/master/RSA.js
 * Codigo usa BigInteger.js https://github.com/peterolson/BigInteger.js para manejar integer grandes
 */
class RSA {
  generate(keysize: number){    
    if (bigInt(keysize).isOdd()){
      throw new Error('Tamaño de llave impar. El Tamaño de la llave tiene que ser par')
    }
    const spinner =  new Spinner('Generando claves.. %s')
    spinner.setSpinnerString('|/-\\')
    spinner.start()

    function randomPrime(bits: number): bigInt.BigInteger{
      const min = bigInt(6074001000).shiftLeft(bits - 33);  // min ≈ √2 × 2^(bits - 1)
      const max = bigInt.one.shiftLeft(bits).minus(1);  // max = 2^(bits) - 1
      for (;;) {
        const p = bigInt.randBetween(min, max);  // WARNING: not a cryptographically secure RNG!
        if (p.isProbablePrime(256)) {
          return p;
        }
      }
    }

    // set up variables for key generation
    const e = bigInt(randomPrime(40));  // use random prime for public exponent
    let p;
    let q;
    let lambda;

    // generate p and q such that λ(n) = lcm(p − 1, q − 1) is coprime with e and |p-q| >= 2^(keysize/2 - 100)
    do {
      p = randomPrime(keysize / 2);
      q = randomPrime(keysize / 2);
      lambda = bigInt.lcm(p.minus(1), q.minus(1));
    } while (bigInt.gcd(e, lambda).notEquals(1) || p.minus(q).abs().shiftRight(
        keysize / 2 - 100).isZero());

    spinner.stop(false)
    console.log('Claves generadas')
    return {
      n: p.multiply(q),  // public key (part I)
      e: e,  // public key (part II)
      d: e.modInv(lambda),  // private key d = e^(-1) mod λ(n)
    };    
  }
  encrypt(m:bigInt.BigInteger, n:bigInt.BigInteger, e:bigInt.BigInteger): bigInt.BigInteger{
    return m.modPow(e, n);
  }

  decrypt(c:bigInt.BigInteger, d:bigInt.BigInteger, n:bigInt.BigInteger){
    return c.modPow(d, n);
  }
}

// Exporta esta clase
export default new RSA()