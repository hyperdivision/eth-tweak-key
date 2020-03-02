const signVerify = require('eth-sign-verify')
const { tweakPrivate, tweakPublic } = require('.')
const curve = require('secp256k1')
const test = require('tape')
const crypto = require('crypto')

test('simple', async function (assert) {
  const keypair = keygen()

  for (var i = 0; i < 100; i++) {
    const tweak = crypto.randomBytes(32)

    const tweakedSK = tweakPrivate(Buffer.from(keypair.privateKey), tweak)
    const sig = await signVerify.signMessage('hello world', tweakedSK)
    const tweakedPK = tweakPublic(Buffer.from(keypair.publicKey), tweak)
    const result = await signVerify.verifyMessage('hello world', sig, tweakedPK.address)
    assert.ok(result)
  }
  assert.end()
})

function keygen () {
  const privateKey = crypto.randomBytes(32)

  const publicKey = curve.publicKeyCreate(privateKey, false)

  return { privateKey, publicKey }
}
