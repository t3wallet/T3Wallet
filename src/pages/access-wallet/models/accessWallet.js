import { unlockWallet } from '../services/unlock'

export default {
  namespace: 'accessWallet',
  state: {
    walletLoaded: false,
    error: '',
  },
  effects: {
    * unlockWallet ({ payload }, { call, put }) {
      const { walletType, payload: walletPayload } = payload
      const data = yield call(unlockWallet, walletType, walletPayload)
      if (data.success) {
        const { identity } = data
        yield put({ type: 'loadWallet' })
        yield put({ type: 'myWallet/addIdentity', payload: identity })
      } else {
        yield put({ type: 'updateError', payload: data.error })
      }
    },

  },
  reducers: {
    loadWallet (draft) {
      draft.walletLoaded = true
    },
    updateError (draft, { payload: error }) {
      draft.error = error
    },
  },
}
