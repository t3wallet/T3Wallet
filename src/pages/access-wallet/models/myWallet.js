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
    k1: [], // object { address: "k1...", balance: "999,999"}

    // Modal
    showNewAccountModal: false,

    // Transfer form
    transferFormFields: {
      toAddress: '',
      amountToSend: '',
      gasLimit: '',
      sendData: '',
    },


  },
  effects: {
    * originateAccount (action, { put }) {
      try {
        // TODO: RPC call to originate a new account
        const address = 'kt1'
        const balance = 0
        yield put({ type: 'newK1Wallet', payload: { address, balance } })
      } catch (e) {
        yield put({ type: 'updateMnemonic_failed' })
      }
    },

  },
  reducers: {
    newK1Wallet (draft, { payload }) {
      const { address, balance } = payload
      draft.accounts.push({ type: 'K1', address, balance })
    },
  },
}
