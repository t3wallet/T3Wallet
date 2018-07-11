import zh_CN from './zh_CN.json'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myWallet from './myWallet.json'

const document = {
  ...zh_CN,
  ...accessWallet,
  ...createWallet,
  ...myWallet,
}

export default document
