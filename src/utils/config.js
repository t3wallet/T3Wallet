const localhost = { name: 'localhost', url: 'localhost:8732' }
const tezrpc = { name: 'Tezos Betenet Network (tezrpc.me)', url: 'https://tezrpc.me' }

module.exports = {
  name: 'Tezos Wallet',
  prefix: 'xtz',
  footerText: 'Tezos Wallet  © 2018 antibyes',
  logo: '/logo.svg',
  CORS: [],
  openPages: ['/create-wallet'],
  networkProviders: [tezrpc, localhost],
  rpc: {
  },
}
