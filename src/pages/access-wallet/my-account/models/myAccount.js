import { findIndex } from 'lodash'
import { message } from 'antd'
import { loadAccount, sendToken } from '../services/account'

export default {
  namespace: 'myAccount',
  state: {
    accountLoaded: false,
    accounts: [],
    activeAccountIndex: 0,
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
    * sendToken ({ payload }, { call, put }) {
      const {
        toAddress, amount, gas, data,
      } = payload
      const curAccount = this.accounts[this.activeAccountIndex]
      const { address, keys } = curAccount
      try {
        const response = yield call(sendToken, toAddress, address, keys, amount, gas, data)
        if (response.success) {
          message.success('Send Operation Success!')
        }
      } catch (error) {
        yield put({ type: 'sendToken_faild' })
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
    resetIdentity (draft, { payload: identity }) {
      draft.accountLoaded = true
      draft.accounts = [identity]
    },
    updateAccountBalance (draft, { payload }) {
      const { address, balance } = payload
      const index = findIndex(draft.accounts, { address })
      draft.accounts[index].balance = balance
    },
    logout (draft) {
      draft.accountLoaded = false
      draft.accounts = []
      draft.activeAccount = NaN
    },
  },
}
