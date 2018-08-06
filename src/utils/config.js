import languages from '../locales/languagesList'

/**
 * If you develop locally, change url for localhost to http://localhost:${port}
*/

const env = process.env.NODE_ENV
let localhost = { name: 'localhost:8732', url: 'http://localhost:8732', type: 'betanet' }
let tezrpc = { name: 'Tezos Betenet Network (tezrpc.me)', url: 'https://rpc.tezrpc.me', type: 'betanet' }
let networkProviders
if (env === 'production') {
  networkProviders = [tezrpc]
} else {
  networkProviders = [tezrpc, localhost]
}

// cryptonomicProd = { name: 'Tezos Betanet (cryptonomic-infra.trch)', url: 'https://tezos-prod.cryptonomic-infra.tech/', type: 'betanet' }
// cryptonomicTest = { name: 'Tezos Zeronet Network (cryptonomic-infra.tech)', url: 'https://tezos-staging.cryptonomic-infra.tech', type: 'zeronet' }

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
  networkProviders,
  menu,
  languages,
}
export default config
