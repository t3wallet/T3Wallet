import en_US from './en_US.json'
import createWallet from './createWallet.json'

export * from './en_US.json'

const document = {
  ...en_US,
  ...createWallet,
}

export default document
