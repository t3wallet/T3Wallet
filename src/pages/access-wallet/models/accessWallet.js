import sotez from 'sotez'

export default {
  namespace: 'accessWallet',
  state: {
    walletLoaded: false,
    privateKey: '',

    mnemonic: '',
    mmemonicPassword: '',

    foundraiser: '',
  },
  effects: {
    * createWallet (action, { put }) {
      try {
        const mnemonic = yield sotez.crypto.generateMnemonic()
        yield put({ type: 'updateMnemonic', mnemonic })
        yield put({ type: 'updateLeftWords', mnemonic })
      } catch (e) {
        yield put({ type: 'updateMnemonic_failed' })
      }
    },

  },
  reducers: {
    updatePrivateKey (draft, { payload: privateKey }) {
      draft.privateKey = privateKey
    },

    updateMnemonic (draft, { payload: mnemonic }) {
      draft.updateMnemonic = mnemonic
    },

    updateMnemonicPassword (draft, { payload: mnemonicPassword }) {
      draft.updateMnemonicPassword = mnemonicPassword
    },
  },
}
