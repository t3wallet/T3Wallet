// import sotez from 'sotez'

export default {
  namespace: 'myWallet',
  state: {
    accounts: [],
    activeAccountAddress: 0,
    // Modal
    showNewAccountModal: false,


    // Transfer form
    transferFormFields: {
      toAddress: '',
      amountToSend: '',
      gasLimit: '',
      sendData: '',
    },

    delegateFormFields: {
      toAddress: '',
    },
  },
  effects: {
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
      draft.accounts.push(identity)
    },
  },
}
