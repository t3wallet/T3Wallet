import sotez from 'sotez'

export const generateMnemonic = () => {
  return sotez.crypto.generateMnemonic()
}

export const generateIdentity = (mnemonic, passphrase = '') => {
  const keys = sotez.crypto.generateKeys(mnemonic, passphrase)
  const identity = {
    temp: { sk: keys.sk, pk: keys.pk, pkh: keys.pkh },
    pkh: keys.pkh,
    accounts: [{ title: 'Main', address: keys.pkh, public_key: keys.pk }],
  }
  return identity
}
