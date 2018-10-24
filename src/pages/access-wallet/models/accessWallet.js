import router from 'umi/router'
import { unlockWallet } from '../services/unlock'
import { getVersion } from '../../../services/ledger'

export default {
  namespace: 'accessWallet',
  state: {
    error: '',
    ledgerModalVisible: false,
    ledgerModalSignRequiredTextVisible: false,
  },
  effects: {
    * unlockWallet ({ payload }, { call, put }) {
      yield put({ type: 'updateError', payload: '' })
      const { walletType, payload: walletPayload } = payload
      if (walletType === 'ledger') yield put({ type: 'showSignRequiredText' })
      try {
        // identity = { prefix: 'tz', type: 'manager', keys: {}, address: 'tz1XXX' }
        const identity = yield call(unlockWallet, walletType, walletPayload)
        yield put({
          type: 'account/setIdentity',
          payload: { identity, walletType },
        })
        if (walletType === 'ledger') yield put({ type: 'toggleLedgerModal', payload: false })
        router.push('/access-wallet/my-account')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    * openLedgerModal (action, { call, put }) {
      yield put({ type: 'updateError', payload: '' })
      try {
        const { major } = yield call(getVersion)
        if (typeof major !== 'undefined') {
          yield put({ type: 'toggleLedgerModal', payload: true })
        }
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
    showSignRequiredText (draft) {
      draft.ledgerModalSignRequiredTextVisible = true
    },
    toggleLedgerModal (draft, { payload: isVisible }) {
      draft.ledgerModalVisible = isVisible
      if (!isVisible) {
        draft.ledgerModalSignRequiredTextVisible = false
      }
    },
  },
}
