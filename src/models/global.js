import { setNetworkProvider } from '../services/app'

export default {
  namespace: 'global',
  state: {
    i18n: 'en',
    locationPathname: '',
    locationQuery: {},

    curNetworkProvider: 'https://tezrpc.me',
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
  effects: {
    * setNetworkProvider ({ payload }, { call, put }) {
      yield call(setNetworkProvider, payload)
      yield put({ type: 'updateNetworkProvider' }, payload)
      yield put({ type: 'myAccount/loadAccount' })
    },

  },
  reducers: {
    updateState (draft, { payload }) {
      const { locationPathname, locationQuery } = payload
      draft.locationPathname = locationPathname
      draft.locationQuery = locationQuery
    },

    changeGas (draft, { payload: gas }) {
      draft.gas = gas
    },
    changeLang (draft, { payload: locale }) {
      draft.i18n = locale
    },
    updateNetworkProvider (draft, { payload: network }) {
      draft.curNetwork = network
    },
  },
}
