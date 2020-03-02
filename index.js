const curve = require('secp256k1')
const hash = require('keccak')
const assert = require('nanoassert')
const checksum = require('eth-checksum')

const TWEAKBYTES = 32
function validatePublicKey (publicKey) {
  return curve.publicKeyVerify(publicKey)
}

function tweakPublic (publicKey, tweak, chainId) {
  assert(tweak.byteLength === TWEAKBYTES, 'tweak must be TWEAKBYTES bytes')
  const pk = curve.publicKeyTweakMul(publicKey, tweak, false)
  const digest = hash('keccak256').update(Buffer.from(pk.slice(1))).digest().slice(-20)
  const address = checksum.encode(digest, chainId)

  return { publicKey: pk, address }
}
function tweakPrivate (privateKey, tweak) {
  assert(tweak.byteLength === TWEAKBYTES, 'tweak must be TWEAKBYTES bytes')
  return curve.privateKeyTweakMul(privateKey, tweak)
}

module.exports = {
  validatePublicKey,
  tweakPublic,
  tweakPrivate,
  TWEAKBYTES
}
