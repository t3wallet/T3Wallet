import { message } from 'antd'
import { unionBy, isArray } from 'lodash'
import {
  loadAccountInfo,
  loadKTAccounts,
  sendToken,
  originateAccount,
  setDelegation,
  genUnsignedTransaction,
  injectTransaction,
} from '../services/operations'
import { signOperation } from '../services/ledger'

export default {
  namespace: 'account',
  state: {
    walletType: '',
    HDPath: "44'/1729'/0'/0'",
    ledgerSignModalVisible: false,

    accounts: [],
    keys: {},
    activeAccountIndex: '',

    sendOperationModalVisible: false,
    lastOpHash: '',
    opType: '',

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
        const { accounts } = yield select(state => state.account)
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
        const { keys } = yield select(state => state.account)
        const originationAcconts = yield call(loadKTAccounts, keys.pkh)
        yield put({
          type: 'importOriginationAccounts',
          payload: { accounts: originationAcconts },
        })
        yield put({ type: 'refreshAccounts' })
      } catch (e) {
        throw new Error(
          'Load KT Acccount Failed, Check your internet connection.'
        )
      }
    },
    * sendToken ({ payload }, { call, put, select }) {
      const {
        fromAddress, toAddress, amount, fee, gasLimit, data,
      } = payload
      try {
        let res
        const { keys, walletType, HDPath } = yield select(state => state.account)
        if (walletType === 'ledger') {
          const { opbytes, opOb } = yield call(genUnsignedTransaction, 'transaction', { ...payload, keys })

          yield put({ type: 'toggleLedgerSignModal', payload: { isShow: true } })
          const { signature } = yield call(signOperation, HDPath, `03${opbytes}`)
          yield put({ type: 'toggleLedgerSignModal', payload: { isShow: false } })
          res = yield call(injectTransaction, opbytes, opOb, signature)

          if (res.error) {
            throw new Error('Transaction Failed')
          }
        } else {
          res = yield call(
            sendToken,
            toAddress,
            fromAddress,
            keys,
            amount,
            fee,
            gasLimit,
            data,
            walletType,
            HDPath
          )
        }
        yield put({ type: 'sendSuccess', payload: res })
        message.success('Send Operation Success!')
      } catch (e) {
        console.log(e)
        yield put({ type: 'toggleLedgerSignModal', payload: { isShow: false } })
        const { errors } = e
        let errorMessage = ''
        if (errors && errors[0] && errors[0].id) {
          errorMessage = errors[0].id
          if (errorMessage === 'proto.alpha.gas_exhausted.operation') {
            errorMessage = 'Fee quota exceeded for the operation'
          }
        }
        if (errorMessage === '') {
          throw e
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },
    * originateAccount (action, { put, select, call }) {
      yield put({ type: 'originating' })
      let result
      try {
        const { keys, walletType, HDPath } = yield select(state => state.account)
        if (walletType === 'ledger') {
          const { opbytes, opOb } = yield call(genUnsignedTransaction, 'origination', { keys })
          yield put({ type: 'toggleLedgerSignModal', payload: { isShow: true } })
          const { signature } = yield call(signOperation, HDPath, `03${opbytes}`)
          yield put({ type: 'toggleLedgerSignModal', payload: { isShow: false } })
          result = yield call(injectTransaction, opbytes, opOb, signature)
          if (result.error) {
            throw new Error('Origination Failed')
          }
        } else {
          result = yield call(originateAccount, keys)
        }
        // const result = { hash: 'ThebEstteZoswEbwalletSofaR', address: 'KT1111111111', operations: [] }
        yield put({ type: 'originateAccountSuccess', payload: result })
        message.success('Operation Success!')
      } catch (e) {
        yield put({ type: 'toggleLedgerSignModal', payload: { isShow: false } })
        const { errors } = e
        let errorMessage = ''
        if (errors && errors[0] && errors[0].id) {
          errorMessage = errors[0].id
          console.log(errorMessage)
          if (errorMessage === 'proto.alpha.contract.balance_too_low') {
            errorMessage = 'Balance too low. 0.257xtz is needed to generate an delegatable account.'
          }
        }
        if (errorMessage === '') {
          throw e
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },
    * setDelegation ({ payload }, { put, select, call }) {
      try {
        const { fromAddress, toDelegation, fee } = payload
        const { keys } = yield select(state => state.account)
        const response = yield call(
          setDelegation,
          fromAddress,
          keys,
          toDelegation,
          fee
        )
        yield put({ type: 'setDelegationSuccess', payload: response })
      } catch (error) {
        const { errors } = error
        let errorMessage = errors[0].id
        if (errorMessage === 'proto.alpha.gas_exhausted.operation') {
          errorMessage = 'Fee quota exceeded for the operation'
        }
        throw new Error(`Operation Failed! ${errorMessage}`)
      }
    },
  },
  reducers: {
    setIdentity (draft, { payload }) {
      const { identity, walletType, path } = payload
      const { keys } = identity
      draft.accounts = [identity]
      draft.activeAccountIndex = '0'
      draft.keys = keys
      draft.walletType = walletType
      if (path) draft.HDPath = path
    },
    updateAccountData (draft, { payload }) {
      const { activeAccountIndex, data } = payload
      draft.accounts[activeAccountIndex] = {
        ...draft.accounts[activeAccountIndex],
        ...data,
      }
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
    toggleLedgerSignModal (draft, { payload }) {
      const { isShow } = payload
      draft.ledgerSignModalVisible = isShow
    },
    sendSuccess (draft, { payload }) {
      const { hash } = payload
      draft.lastOpHash = hash
      draft.ledgerSignModalVisible = false
      draft.sendOperationModalVisible = true
    },
    closeSendOperationModal (draft) {
      draft.sendOperationModalVisible = false
      draft.opType = ''
      draft.lastOpHash = ''
    },
    originating (draft) {
      draft.originating = true
    },
    originateAccountFailed (draft) {
      draft.originating = false
    },
    originateAccountSuccess (draft, { payload }) {
      const { hash, address } = payload
      draft.lastOpHash = hash
      draft.opType = 'origination'
      draft.sendOperationModalVisible = true
      draft.accounts.push({ type: 'KT', kind: 'origination', address })
    },
    setDelegationSuccess (draft, { payload }) {
      const { hash } = payload
      draft.lastOpHash = hash
      draft.opType = 'delegation'
      draft.sendOperationModalVisible = true
    },
    logout (draft) {
      draft.accounts = []
      draft.activeAccountAddress = ''
    },
  },
}
