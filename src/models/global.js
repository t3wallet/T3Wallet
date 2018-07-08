import { networkProviders } from 'config'
import languages from '../locales/languagesList'

export default {
  namespace: 'global',
  state: {
    menu: [
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
    ],
    curMenu: ['create-wallet'],
    languages,
    i18n: 'en',
    gas: '0.001',
    locationPathname: '',
    locationQuery: {},
    networkProviders,
    curNetworkProvider: networkProviders[0],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.search,
          },
        })
      })
    },
  },
  effects: {},
  reducers: {
    updateState (draft, { payload }) {
      const { locationPathname, locationQuery } = payload
      draft.locationPathname = locationPathname
      draft.locationQuery = locationQuery
    },

    changeMenu (draft, { payload: key }) {
      draft.curMenu = [key]
    },

    changeGas (draft, { payload: gas }) {
      draft.gas = gas
    },
    changeLang (draft, { payload: locale }) {
      draft.i18n = locale
    },
    changeNetworkProvider (draft, { payload: network }) {
      draft.curNetwork = network
    },
  },
}
