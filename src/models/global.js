import { setNetworkProvider, getBlockHead } from '../services/app'

export default {
  namespace: 'global',
  state: {
    i18n: 'en',
    locationPathname: '',
    locationQuery: {},

    curNetworkProvider: 'https://tezrpc.me',
    blockHead: {},
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
      yield put({ type: 'setBlockHead', payload: {} })
      yield call(setNetworkProvider, payload)
      yield put({ type: 'updateNetworkProvider' }, payload)
      yield put({ type: 'getBlockHead' })
      yield put({ type: 'myAccount/loadAccount' })
    },
    * getBlockHead (action, { call, put }) {
      try {
        const blockHead = yield call(getBlockHead)
        yield put({ type: 'setBlockHead', payload: blockHead })
      } catch (e) {
        yield put({ type: 'connect_rp_failed' })
      }
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
    setBlockHead (draft, { payload }) {
      draft.blockHead = payload
    },
  },
}
