// let Transport = require('@ledgerhq/hw-transport-node-hid').default
import Transport from "@ledgerhq/hw-transport-u2f";
import eztz from "utils/eztz";

let App = require("basil-tezos-ledger").default;

const genAddress = pk => {
  const pp = eztz.utility.b58cencode(
    eztz.utility.hex2buf(pk.substr(2)),
    eztz.prefix.edpk
  );
  const address = eztz.utility.b58cencode(
    eztz.library.sodium.crypto_generichash(
      20,
      eztz.utility.b58cdecode(pp, eztz.prefix.edpk)
    ),
    eztz.prefix.tz1
  );
  return address;
};
export const getAddress = async path => {
  try {
    const transport = await Transport.create();
    const xtz = new App(transport);
    const result = await xtz.getAddress(path, true);
    return genAddress(result.publicKey);
  } catch (err) {
    throw err;
  }
};

export const signOperation = async path => {
  try {
    const transport = await Transport.create();
    const xtz = new App(transport);
    const result = await xtz.signOperation(
      path,
      "0342397c7a82e1f7509513642e573020aeb0aea36ac087139085e42d480cd08520070000d2e495a7ab40156d0a7c35b73d2530a3470fc8700002000000cda3081bd81219ec494b29068dcfd19e427fed9a66abcdc9e9e99ca6478f60e9080000d2e495a7ab40156d0a7c35b73d2530a3470fc870d0860303c80100c0ba99060000e7670f32038107a59a2b9cfefae36ea21f5aa63c00"
    );
    return result.signature;
  } catch (err) {
    throw err;
  }
};

export const getVersion = async () => {
  try {
    const transport = await Transport.create();
    const xtz = new App(transport);
    const versionInfo = await xtz.getVersion();
    return versionInfo;
  } catch (err) {
    throw err;
  }
};
