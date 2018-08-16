import ko_KR from './ko_KR.json'
import accessWallet from './accessWallet'
import createWallet from './createWallet'
import myAccount from './myAccount'
import footer from './footer'

const document = {
  ...ko_KR,
  ...accessWallet,
  ...createWallet,
  ...myAccount,
  ...footer,
}

export default document
