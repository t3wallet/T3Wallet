import languages from '../locales/languagesList'

const localhost = { name: 'localhost:8732', url: 'http://localhost:8732', type: 'betanet' }
const tezrpc = { name: 'Tezos Betenet Network (tezrpc.me)', url: 'https://rpc.tezrpc.me', type: 'betanet' }
const cryptonomicProd = { name: 'Tezos Betanet (cryptonomic-infra.trch)', url: 'https://tezos-prod.cryptonomic-infra.tech/', type: 'betanet' }
const cryptonomicTest = { name: 'Tezos Zeronet Network (cryptonomic-infra.tech)', url: 'https://tezos-staging.cryptonomic-infra.tech', type: 'zeronet' }
const menu = [
  {
    key: '/create-wallet',
    localeId: 'tabs.createWallet',
    icon: 'file-add',
    name: 'New Wallet',
    route: '/create-wallet',
  },
  {
    key: '/access-wallet',
    localeId: 'tabs.accessWallet',
    icon: 'wallet',
    name: 'Access Your Wallet',
    route: '/access-wallet',
  },
]

const config = {
  name: 'Tezos Wallet',
  prefix: 'xtz',
  footerText: 'Tezos Wallet  © 2018 antibyes',
  logo: '/logo.svg',
  CORS: [],
  openPages: ['/create-wallet'],
  networkProviders: [cryptonomicProd, cryptonomicTest, tezrpc, localhost],
  menu,
  languages,
}
export default config
