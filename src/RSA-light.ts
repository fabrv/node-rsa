import bigInt from 'big-integer'

class RSALight{
  generate(seed: number){
    // Random prime generator for p and q
    function randomPrime(): bigInt.BigInteger{
      const min = bigInt(6074001000).shiftLeft(seed - 33)
      const max = bigInt.one.shiftLeft(seed).minus(1)
      for (;;) {
        const p = bigInt.randBetween(min, max)  // WARNING: not a cryptographically secure RNG!
        if (p.isProbablePrime(256)) {
          return p
        }
      }
    }
    const p: bigInt.BigInteger = randomPrime()
    
  }
}