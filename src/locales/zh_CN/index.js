import zh_CN from './zh_CN.json'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myAccount from './myAccount'
import footer from './footer'

const document = {
  ...zh_CN,
  ...accessWallet,
  ...createWallet,
  ...myAccount,
  ...footer,
}

export default document
