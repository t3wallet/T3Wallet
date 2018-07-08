import sotez from 'sotez'

export default {
  namespace: 'createWallet',
  state: {
    mnemonic: '',
    steps: [{
      title: 'Generate Mnemonic',
      content: 'Generate Mnemonic',
    }, {
      title: 'Backup',
      content: 'Write Down on a paper',
    }, {
      title: 'verify',
      content: 'Verify your Mnemonic',
    }],
    curStep: 0,
  },
  effects: {
    * createWallet (action, { put }) {
      try {
        const mnemonic = yield sotez.crypto.generateMnemonic()
        yield put({ type: 'updateMnemonic', mnemonic })
      } catch (e) {
        yield put({ type: 'updateMnemonic_failed' })
      }
    },

  },
  reducers: {
    updateMnemonic (draft, { mnemonic }) {
      draft.mnemonic = mnemonic
      draft.curStep++
    },
    updateStep (draft, { step }) {
      draft.curStep = step
    },
  },
}
