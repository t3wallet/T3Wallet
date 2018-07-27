import { unionBy, isArray } from 'lodash'
import { message } from 'antd'
import {
  loadAccountInfo, loadKTAccounts, sendToken, originateAccount, setDelegation,
} from '../services/account'

export default {
  namespace: 'myAccount',
  state: {
    accountLoaded: false,
    accounts: [],
    keys: {},
    activeAccountIndex: '',
    sendOperationModalVisible: false,
    lastOpHash: '',
    delegating: false,

    delegates: [],

    originating: false,
  },
  effects: {
    * refreshAccounts (action, {
      all, call, put, select,
    }) {
      try {
        let promises = []
        const { accounts } = yield select(state => state.myAccount)
        accounts.forEach((account) => {
          const { address } = account
          promises.push(call(loadAccountInfo, address))
        })
        const accountsData = yield all(promises)
        for (let i = 0; i < accountsData.length; i++) {
          yield put({
            type: 'updateAccountData',
            payload: { activeAccountIndex: i, data: accountsData[i] },
          })
        }
      } catch (e) {
        console.log('[UPDATE ACCOUNT ERROR]', e)
        throw new Error('Update Account Error')
      }
    },
    * loadKTAccounts (action, { call, put, select }) {
      try {
        const { keys } = yield select(state => state.myAccount)
        const originationAcconts = yield call(loadKTAccounts, keys.pkh)
        yield put({
          type: 'importOriginationAccounts',
          payload: { accounts: originationAcconts },
        })
        yield put({ type: 'refreshAccounts' })
      } catch (e) {
        throw new Error('Load KT Acccount Failed, Check your internet connection.')
      }
    },
    * sendToken ({ payload }, { call, put, select }) {
      const {
        toAddress, amountToSend, gas, gasLimit, data,
      } = payload
      try {
        const { accounts, keys, activeAccountIndex } = yield select(state => state.myAccount)
        const curAccount = accounts[activeAccountIndex]
        const { address } = curAccount
        // console.log('/ myAddress: ', address, '/ myKeys: ', keys, '/ toAddress:', toAddress, '/ amountToSend: ', amountToSend, '/ gas', gas)
        const response = yield call(sendToken, toAddress, address, keys, amountToSend, gas, gasLimit, data)
        yield put({ type: 'sendSuccess', payload: response })
        message.success('Send Operation Success!')
      } catch (error) {
        const { errors } = error
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
        const result = yield call(originateAccount, keys)
        // const result = { hash: 'ThebEstteZoswEbwalletSofaR', address: 'KT1111111111', operations: [] }
        yield put({ type: 'originateAccountSuccess', payload: result })
        message.success('Operation Success!')
      } catch (error) {
        const { errors } = error
        let errorMessage = errors[0].id
        console.log(errorMessage)
        if (errorMessage === 'proto.alpha.contract.balance_too_low') {
          errorMessage = 'Balance too low. 0.257xtz is needed to generate an delegatable account.'
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },
    * setDelegation ({ payload }, { put, select, call }) {
      try {
        const { fromAddress, toDelegation, gas } = payload
        const { keys } = yield select(state => state.myAccount)
        const response = yield call(setDelegation, fromAddress, keys, toDelegation, gas)
        yield put({ type: 'setDelegationSuccess', payload: response })
      } catch (e) {
        throw new Error('Operation Failed', e)
      }
    },
  },
  reducers: {
    setIdentity (draft, { payload: identity }) {
      const { keys } = identity
      draft.accountLoaded = true
      draft.accounts = [identity]
      draft.activeAccountIndex = '0'
      draft.keys = keys
    },
    updateAccountData (draft, { payload }) {
      const {
        activeAccountIndex, data,
      } = payload
      draft.accounts[activeAccountIndex] = { ...draft.accounts[activeAccountIndex], ...data }
    },
    importOriginationAccounts (draft, { payload }) {
      const { accounts } = payload
      let accArray = accounts
      if (!isArray(accounts)) {
        accArray = [accounts]
      }
      draft.accounts = unionBy(draft.accounts, accArray, 'address')
    },
    changeActiveAccount (draft, { payload }) {
      const { activeAccountIndex } = payload
      draft.activeAccountIndex = activeAccountIndex
    },
    sendSuccess (draft, { payload }) {
      const { hash } = payload
      draft.lastOpHash = hash
      draft.sendOperationModalVisible = true
    },
    closeSendOperationModal (draft) {
      draft.sendOperationModalVisible = false
    },
    originating (draft) {
      draft.originating = true
    },
    originateAccountSuccess (draft, { payload }) {
      const { hash, address } = payload
      draft.lastOpHash = hash
      draft.sendOperationModalVisible = true
      draft.accounts.push({ type: 'KT', kind: 'origination', address })
    },
    originateAccountFailed (draft) {
      draft.originating = false
    },
    setDelegationSuccess (draft, { payload }) {
      const { hash } = payload
      draft.lastOpHash = hash
      draft.sendOperationModalVisible = true
    },
    logout (draft) {
      draft.accountLoaded = false
      draft.accounts = []
      draft.activeAccountAddress = ''
    },
  },
}
