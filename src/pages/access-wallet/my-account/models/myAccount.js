import { findIndex } from 'lodash'
import { message } from 'antd'
import { loadAccount, sendToken, originateAccount } from '../services/account'

export default {
  namespace: 'myAccount',
  state: {
    accountLoaded: false,
    accounts: [],
    activeAccountIndex: '',
    sendOperationModalVisible: false,
    lastOpHash: '',
    sending: false,

    originating: false,
  },
  effects: {
    * loadAccount ({ payload: address }, { call, put }) {
      try {
        const response = yield call(loadAccount, address)
        yield put({
          type: 'updateAccountBalance',
          payload: { address, balance: response },
        })
      } catch (e) {
        throw new Error('updateAccountBalance_failed')
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
        yield put({ type: 'sendSuccess', payload: response })
        message.success('Send Operation Success!')
      } catch (error) {
        console.log(error)
        const { errors } = error
        yield put({ type: 'sendFailed' })
        let errorMessage = errors[0].id
        if (errorMessage === 'proto.alpha.gas_exhausted.operation') {
          errorMessage = 'Gas quota exceeded for the operation'
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },
    * originateAccount (action, { put, select, call }) {
      yield put({ type: 'originating' })
      try {
        const { accounts, activeAccountIndex } = yield select(state => state.myAccount)
        const curAccount = accounts[activeAccountIndex]
        const { keys } = curAccount
        const response = yield call(originateAccount, keys)
        yield put({ type: 'originateAccountSuccess', payload: response })
      } catch (error) {
        const { errors } = error
        let errorMessage = errors[0].id
        console.log(errorMessage)
        if (errorMessage === 'proto.alpha.contract.balance_too_low') {
          errorMessage = 'Balance too low. 0.25xtz is needed to generate an delegatable account.'
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },

  },
  reducers: {
    resetIdentity (draft, { payload: identity }) {
      console.log(identity)
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
    originating (draft) {
      draft.originating = true
    },
    originateAccountSuccess (draft, { payload }) {
      const { address } = payload
      draft.accounts.push({ type: 'KT', kind: 'Origination', address })
    },
    originateAccountFailed (draft) {
      draft.originating = false
    },
    logout (draft) {
      draft.accountLoaded = false
      draft.accounts = []
      draft.activeAccountAddress = ''
    },
  },
}
