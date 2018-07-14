import router from 'umi/router'
import { unlockWallet } from '../services/unlock'

export default {
  namespace: 'accessWallet',
  state: {
    error: '',
  },
  effects: {
    * unlockWallet ({ payload }, { call, put }) {
      const { walletType, payload: walletPayload } = payload
      const data = yield call(unlockWallet, walletType, walletPayload)
      if (data.success) {
        const { identity } = data
        yield put({ type: 'myAccount/addIdentity', payload: identity })
        router.push('/access-wallet/my-account')
      } else {
        yield put({ type: 'updateError', payload: data.error })
      }
    },

  },
  reducers: {
    updateError (draft, { payload: error }) {
      draft.error = error
    },
  },
}
