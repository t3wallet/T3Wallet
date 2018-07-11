// import sotez from 'sotez'

export default {
  namespace: 'myWallet',
  state: {
    accounts: [{
      type: 'manager',
      balance: '101.0001',
      address: 'tz1XMRWVwwEZSZxkKurt3gAzr8G8fKPPE7QK',
    }],
    privateKey: '',
    publicKey: '',
    balance: '',
    kT: [], // object { address: "KT...", balance: "999,999"}

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
  },
}
