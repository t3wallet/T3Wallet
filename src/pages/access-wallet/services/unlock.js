import eztz from 'utils/eztz'

const generateIdentity = (keys) => {
  const { pkh } = keys
  let alias
  const prefix = (pkh.slice(0, 2))
  if (prefix === 'tz') alias = 'Manager'
  else if (prefix === 'KT') alias = 'Smart Contract'
  let identity = {
    type: prefix,
    alias,
    keys,
    address: pkh,
  }
  return identity
}

export const unlockWallet = (type, payload) => {
  console.log('[Unlock Wallet Type]', type)
  let identity
  if (type === 'mnemonic') {
    const { mnemonic, password } = payload
    const keys = eztz.crypto.generateKeys(mnemonic, password)
    identity = generateIdentity(keys)
    return { success: true, identity }
  } if (type === 'ico') {
    const {
      seed, email, password, code,
    } = payload
    const keys = eztz.crypto.generateKeys(seed, email + password)
    if (code) {
      eztz.rpc.activate({ sk: keys.sk, pk: keys.pk, pkh: keys.pkh }, code).then(() => {
        return { success: true, identity }
      }).catch(() => {
        return { success: false, error: 'Activation Failed. Please check you input.' }
      })
    }
    return { success: true, identity }
  } if (type === 'privateKey') {
    const { privateKey } = payload
    const keys = eztz.crypto.extractKeys(privateKey)
    identity = generateIdentity(keys)
    return { success: true, identity }
  }
  return { success: false, error: 'Wallet Type Not Found' }
}
