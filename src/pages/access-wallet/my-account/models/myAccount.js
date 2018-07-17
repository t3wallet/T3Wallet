import { findIndex } from 'lodash'
import { message } from 'antd'
import { loadAccount, sendToken } from '../services/account'

export default {
  namespace: 'myAccount',
  state: {
    accountLoaded: false,
    accounts: [],
    activeAccountIndex: '',
    sendOperationModalVisible: false,
    lastOpHash: '',

    sending: false,
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
    * sendToken ({ payload }, { call, put, select }) {
      yield put({ type: 'sending' })
      const {
        toAddress, amountToSend, gas, gasLimit, data,
      } = payload
      try {
        const { accounts, activeAccountIndex } = yield select(state => state.myAccount)
        const curAccount = accounts[activeAccountIndex]
        const { address, keys } = curAccount
        // console.log('/ myAddress: ', address, '/ myKeys: ', keys, '/ toAddress:', toAddress, '/ amountToSend: ', amountToSend, '/ gas', gas)
        const response = yield call(sendToken, toAddress, address, keys, amountToSend, gas, gasLimit, data)
        if (response.success) {
          yield put({ type: 'sendSuccess', payload: response })
          message.success('Send Operation Success!')
        }
      } catch (error) {
        yield put({ type: 'sendFailed' })
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
      draft.activeAccountIndex = '0'
    },
    updateAccountBalance (draft, { payload }) {
      const { address, balance } = payload
      const index = findIndex(draft.accounts, { address })
      draft.accounts[index].balance = balance
    },
    changeActiveAccount (draft, { payload }) {
      const { activeAccountIndex } = payload
      draft.activeAccountIndex = activeAccountIndex
    },
    sending (draft) {
      draft.sending = true
    },
    sendSuccess (draft, { payload }) {
      const { hash } = payload
      draft.lastOpHash = hash
      draft.sendOperationModalVisible = true
      draft.sending = false
    },
    sendFailed (draft) {
      draft.sending = false
    },
    closeSendOperationModal (draft) {
      draft.sendOperationModalVisible = false
    },
    logout (draft) {
      draft.accountLoaded = false
      draft.accounts = []
      draft.activeAccountAddress = ''
    },
  },
}
