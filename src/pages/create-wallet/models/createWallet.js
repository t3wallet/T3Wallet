import { isEqual } from 'lodash'
import eztz from 'utils/eztz'

export default {
  namespace: 'createWallet',
  state: {
    mnemonic: [],
    password: '',
    curStep: 0,
    inputWords: [],
    leftWords: [],
    verifyError: false,
  },
  effects: {
    * generateMnemonic ({ payload }, { put }) {
      try {
        const { password } = payload
        const mnemonic = yield eztz.crypto.generateMnemonic()
        yield put({ type: 'updatePassword', password })
        yield put({ type: 'initMnemonic', mnemonic })
        yield put({ type: 'updateLeftWords', mnemonic })
      } catch (e) {
        yield put({ type: 'updateMnemonic_failed' })
      }
    },
    * verifySeed ({ payload }, { put, select }) {
      try {
        const { password: verifyPassowrd } = payload
        const { mnemonic, inputWords, password } = yield select(state => state.createWallet)
        if (isEqual(mnemonic, inputWords) && isEqual(verifyPassowrd, password)) {
          yield put({ type: 'verifySuccess' })
        } else {
          yield put({ type: 'verifyFailed' })
        }
      } catch (e) {
        yield put({ type: 'verifyFailed' })
      }
    },
  },
  reducers: {
    updatePassword (draft, { password }) {
      console.log(password)
      draft.password = password
    },
    initMnemonic (draft, { mnemonic }) {
      draft.inputWords = []
      draft.verifyError = ''
      draft.mnemonic = mnemonic.split(' ')
      draft.curStep++
    },
    updateInputWords (draft, { words }) {
      draft.inputWords = words
    },
    updateLeftWords (draft, { mnemonic }) {
      draft.leftWords = mnemonic.split(' ').sort(() => { return 0.5 - Math.random() })
    },
    updateStep (draft, { step }) {
      draft.curStep = step
    },
    removeInputWord (draft, { payload: index }) {
      const word = draft.inputWords[index]
      draft.inputWords = [...draft.inputWords.slice(0, index), ...draft.inputWords.slice(index + 1)]
      draft.leftWords = [...draft.leftWords, word]
    },
    removeLeftWord (draft, { payload: index }) {
      const word = draft.leftWords[index]
      draft.leftWords = [...draft.leftWords.slice(0, index), ...draft.leftWords.slice(index + 1)]
      draft.inputWords = [...draft.inputWords, word]
    },
    verifySuccess (draft) {
      draft.curStep = 3
    },
    verifyFailed (draft) {
      draft.verifyError = true
    },
    resetState (draft) {
      draft.mnemonic = []
      draft.password = ''
      draft.curStep = 0
      draft.inputWords = []
      draft.leftWords = []
    },
  },
}
