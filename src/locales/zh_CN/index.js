import zh_CN from './zh_CN.json'
import createWallet from './createWallet'

export * from './zh_CN.json'

const document = {
  ...zh_CN,
  ...createWallet,
}

export default document
