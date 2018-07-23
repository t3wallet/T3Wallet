import zh_CN from './zh_CN.json'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myAccount from './myAccount'

const document = {
  ...zh_CN,
  ...accessWallet,
  ...createWallet,
  ...myAccount,
}

export default document
