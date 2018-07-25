import router from 'umi/router'
import { unlockWallet } from '../services/unlock'

export default {
  namespace: 'accessWallet',
  state: {
    error: '', // unused
  },
  effects: {
    * unlockWallet ({ payload }, { call, put }) {
      yield put({ type: 'updateError', payload: '' })
      const { walletType, payload: walletPayload } = payload
      try {
        // identity = { type: 'tz', type: 'manager', keys: {}, address: 'tz1XXX' }
        const identity = yield call(unlockWallet, walletType, walletPayload)
        yield put({ type: 'myAccount/setIdentity', payload: identity })
        router.push('/access-wallet/my-account')
      } catch (error) {
        console.log(error)
        throw error
      }
    },

  },
  reducers: {
    updateError (draft, { payload: error }) {
      draft.error = error
    },
  },
}
