import en_US from './en_US.json'
import createWallet from './createWallet.json'
import myWallet from './myWallet.json'

export * from './en_US.json'

const document = {
  ...en_US,
  ...createWallet,
  ...myWallet,
}

export default document
