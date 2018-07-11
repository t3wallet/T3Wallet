import zh_CN from './zh_CN.json'
import createWallet from './createWallet'
import myWallet from './myWallet'

export * from './zh_CN.json'

const document = {
  ...zh_CN,
  ...createWallet,
  ...myWallet,
}

export default document
