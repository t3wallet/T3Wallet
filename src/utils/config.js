import languages from '../locales/languagesList'

const localhost = { name: 'localhost', url: 'localhost:8732' }
const tezrpc = { name: 'Tezos Betenet Network (tezrpc.me)', url: 'https://tezrpc.me' }
const menu = [
  {
    key: 'create-wallet',
    localeId: 'tabs.createWallet',
    icon: 'file-add',
    name: 'New Wallet',
    route: '/create-wallet',
  },
  {
    key: 'access-wallet',
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
  networkProviders: [tezrpc, localhost],
  menu,
  languages,
}
export default config
