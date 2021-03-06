import eztz from 'utils/eztz'
import { getAddress } from '../../../services/ledger'

export const generateIdentity = (keys) => {
  const { pkh } = keys
  let kind
  const prefix = (pkh.slice(0, 2))
  if (prefix === 'tz') kind = 'manager'
  else if (prefix === 'KT') kind = 'origination'
  let identity = {
    prefix,
    kind,
    keys,
    address: pkh,
  }
  return identity
}

export const unlockWallet = async (walletType, payload) => {
  try {
    console.log('[Unlock Wallet Type]', walletType)
    let identity
    if (walletType === 'mnemonic') {
      const { mnemonic, password } = payload
      const keys = await eztz.crypto.generateKeys(mnemonic, password)
      identity = generateIdentity(keys)
      return identity
    } if (walletType === 'ico') {
      const {
        seed, email, password, address, code,
      } = payload
      const keys = await eztz.crypto.generateKeys(seed, email + password)
      if (code) {
        const response = await eztz.rpc.activate(address, code)
        console.log('[Activation Successful]', response)
      }
      identity = generateIdentity(keys)
      return identity
    } if (walletType === 'privateKey') {
      const { privateKey } = payload
      const keys = eztz.crypto.extractKeys(privateKey)
      if (!keys) {
        throw new Error('Please enter private key starts with \'edsk\' ')
      }
      identity = generateIdentity(keys)
      return identity
    } if (walletType === 'ledger') {
      const { path } = payload
      const { pk, pkh } = await getAddress(path)
      identity = generateIdentity({ pk, pkh, sk: path })
      return identity
    }
    throw new Error('Wallet type not defined')
  } catch (error) {
    throw error
  }
}
