import { findIndex } from 'lodash'
import { loadAccount } from '../services/account'

export default {
  namespace: 'myAccount',
  state: {
    accountLoaded: false,
    accounts: [],
    activeAccount: 0,
  },
  effects: {
    * loadAccount ({ payload: address }, { call, put }) {
      try {
        const response = yield call(loadAccount, address)
        if (response.success) {
          yield put({
            type: 'updateAccountBalance',
            payload: { address, balance: response.balance },
          })
        }
      } catch (e) {
        yield put({ type: 'updateAccountBalance_failed' })
      }
    },
    * originateAccount (action, { put }) {
      try {
        // TODO: RPC call to originate a new account
        const address = 'KT'
        const balance = 0
        yield put({ type: 'newKTWallet', payload: { address, balance } })
      } catch (e) {
        yield put({ type: 'updateMnemonic_failed' })
      }
    },

  },
  reducers: {
    newKTWallet (draft, { payload }) {
      const { address, balance } = payload
      draft.accounts.push({ type: 'KT', address, balance })
    },
    addIdentity (draft, { payload: identity }) {
      draft.accountLoaded = true
      draft.accounts.push(identity)
    },
    updateAccountBalance (draft, { payload }) {
      const { address, balance } = payload
      const index = findIndex(draft.accounts, { address })
      draft.accounts[index].balance = balance
    },
  },
}
