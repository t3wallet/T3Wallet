import en_US from './en_US.json'
import rpcErrors from './rpcErrors'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myAccount from './myAccount.json'

const document = {
  ...en_US,
  ...rpcErrors,
  ...accessWallet,
  ...createWallet,
  ...myAccount,
}

export default document
