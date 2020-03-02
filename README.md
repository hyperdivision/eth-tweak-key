# `eth-tweak-key`

[![Build Status](https://travis-ci.com/hyperdivision/eth-tweak-key.svg?branch=master)](https://travis-ci.com/hyperdivision/eth-tweak-key)

> Tweak ethereum keys inspired by Bitcoin P2C

## Usage

```js
var etk = require('eth-tweak-key')

const tweak = crypto.randomBytes(32) // or from some other source
const { tweakedPublicKey, tweakedAddress } = etk.tweakPublic(Buffer.from(keypair.publicKey), tweak)

// The public key must be validated before use, and tweak changed if invalid
etk.validatePublicKey(tweakedPublicKey)
// can now verify signatures with the above

// To do signatures, derive the corresponding private key
const tweakedPrivateKey = etk.tweakPrivate(Buffer.from(keypair.privateKey), tweak)

```

## API

### `etk.TWEAKBYTES`

Byte length of a tweak

### `const { publicKey, address } = etk.tweakPublic(publicKey, tweak, [chainId=null])`

Tweak `publicKey` with `tweak` and optional `chainId`. Tweak must be
`TWEAKBYTES`. Note that you must pass a copy of `publicKey` for now as a
downstream module mutates this.
Returns `{ publicKey, address }`

### `const valid = etk.validatePublicKey(publicKey)`

Validates `publicKey`. If false you must choose another public key

### `const privateKey = etk.tweakPrivate(privateKey, tweak)`

Tweak `privateKey` with `tweak`. Tweak must be `TWEAKBYTES`.
Note that you must pass a copy of `privateKey` for now as a downstream module
mutates this.

## Install

```sh
npm install eth-tweak-key
```

## License

[ISC](LICENSE)
