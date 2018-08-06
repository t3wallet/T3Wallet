import config from 'config'
import { setNetworkProvider, getBlockHead } from '../services/app'

const { networkProviders } = config

export default {
  namespace: 'global',
  state: {
    i18n: '',
    locationPathname: '',
    locationQuery: {},

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
    * setNetworkProvider ({ payload: index }, { call, put, select }) {
      try {
        const { accounts } = yield select(state => state.account)
        const provider = networkProviders[index]
        yield put({ type: 'setBlockHead', payload: {} })
        yield call(setNetworkProvider, provider.url)
        yield put({ type: 'getBlockHead' })
        if (accounts.length) {
          yield put({ type: 'account/refreshAccounts' })
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    * getBlockHead (action, { call, put }) {
      try {
        const blockHead = yield call(getBlockHead)
        yield put({ type: 'setBlockHead', payload: blockHead })
      } catch (e) {
        console.log(e)
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

    changeFee (draft, { payload: fee }) {
      draft.fee = fee
    },
    changeLang (draft, { payload: locale }) {
      draft.i18n = locale
    },
    setBlockHead (draft, { payload }) {
      draft.blockHead = payload
    },
  },
}
