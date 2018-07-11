import { pull } from 'lodash'
import sotez from 'sotez'

export default {
  namespace: 'createWallet',
  state: {
    mnemonic: [],
    curStep: 0,
    inputWords: [],
    leftWords: [],
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
    updateMnemonic (draft, { mnemonic }) {
      draft.mnemonic = mnemonic.split(' ')
      draft.curStep++
    },
    updateInputWords (draft, { words }) {
      draft.inputWords = words
    },
    updateLeftWords (draft, { mnemonic }) {
      draft.leftWords = mnemonic.split(' ')
    },
    updateStep (draft, { step }) {
      draft.curStep = step
    },
    removeInputWord (draft, { payload: word }) {
      console.log(word)
      draft.inputWords = pull(draft.inputWords, word)
      draft.leftWords = [...draft.leftWords, word]
    },
    removeLeftWord (draft, { payload: word }) {
      console.log([...draft.inputWords, word])
      draft.leftWords = pull(draft.leftWords, word)
      draft.inputWords = [...draft.inputWords, word]
    },
  },
}
