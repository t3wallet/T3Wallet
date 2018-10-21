import router from "umi/router";
import { unlockWallet, generateIdentity } from "../services/unlock";
import { getAddress, getVersion } from "../services/ledger";

export default {
  namespace: "accessWallet",
  state: {
    error: "",
    ledgerModalVisible: false,
    ledgerModalAsciiArtVisible: false
  },
  effects: {
    *unlockWallet({ payload }, { call, put }) {
      yield put({ type: "updateError", payload: "" });
      const { walletType, payload: walletPayload } = payload;
      try {
        // identity = { prefix: 'tz', type: 'manager', keys: {}, address: 'tz1XXX' }
        const identity = yield call(unlockWallet, walletType, walletPayload);
        yield put({ type: "account/setIdentity", payload: identity });
        router.push("/access-wallet/my-account");
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    *openLedgerModal({ payload }, { call, put }) {
      yield put({ type: "updateError", payload: "" });
      try {
        const { major } = yield call(getVersion);
        if (typeof major !== undefined) {
          yield put({ type: "toggleLedgerModal", payload: true });
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    *connectToLedger({ payload }, { call, put }) {
      yield put({ type: "updateError", payload: "" });
      yield put({ type: "promoteAsciiArt" });
      const { path } = payload;
      try {
        // identity = { prefix: 'tz', type: 'manager', keys: {}, address: 'tz1XXX' }
        const pkh = yield call(getAddress, path);
        const identity = yield call(generateIdentity, { pkh });
        yield put({ type: "account/setIdentity", payload: identity });
        yield put({ type: "toggleLedgerModal", payload: false });
        router.push("/access-wallet/my-account");
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  reducers: {
    updateError(draft, { payload: error }) {
      draft.error = error;
    },
    promoteAsciiArt(draft) {
      draft.ledgerModalAsciiArtVisible = true;
    },
    toggleLedgerModal(draft, { payload: isVisible }) {
      draft.ledgerModalVisible = isVisible;
      if (!isVisible) {
        draft.ledgerModalAsciiArtVisible = false;
      }
    }
  }
};
