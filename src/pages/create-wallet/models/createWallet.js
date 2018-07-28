import { pull } from 'lodash'
import eztz from 'utils/eztz'

export default {
  namespace: 'createWallet',
  state: {
    mnemonic: [],
    password: '',
    curStep: 0,
    inputWords: [],
    leftWords: [],
  },
  effects: {
    * generateMnemonic ({ payload }, { put }) {
      try {
        const { password } = payload
        const mnemonic = yield eztz.crypto.generateMnemonic()
        yield put({ type: 'updatePassword', password })
        yield put({ type: 'updateMnemonic', mnemonic })
        yield put({ type: 'updateLeftWords', mnemonic })
      } catch (e) {
        yield put({ type: 'updateMnemonic_failed' })
      }
    },
    * verifySeed ({ payload }, { put, select }) {
      try {
        const { password: verifyPassowrd } = payload
        const { mnemonic, inputWords, password } = yield select(state => state.createWallet)
        if (mnemonic === inputWords && verifyPassowrd === password) {
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
      draft.password = password
    },
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
      draft.inputWords = pull(draft.inputWords, word)
      draft.leftWords = [...draft.leftWords, word]
    },
    removeLeftWord (draft, { payload: word }) {
      draft.leftWords = pull(draft.leftWords, word)
      draft.inputWords = [...draft.inputWords, word]
    },
    verifySuccess (draft) {
      draft.curStep = 3
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
