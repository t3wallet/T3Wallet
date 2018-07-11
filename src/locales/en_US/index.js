import en_US from './en_US.json'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myWallet from './myWallet.json'

const document = {
  ...en_US,
  ...accessWallet,
  ...createWallet,
  ...myWallet,
}

export default document
