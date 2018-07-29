import en_US from './en_US.json'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myAccount from './myAccount'
import footer from './footer'

const document = {
  ...en_US,
  ...accessWallet,
  ...createWallet,
  ...myAccount,
  ...footer,
}

export default document
