// let Transport = require('@ledgerhq/hw-transport-node-hid').default
import Transport from '@ledgerhq/hw-transport-u2f'
import eztz from 'utils/eztz'

let App = require('basil-tezos-ledger').default

const genAddress = async (publicKey) => {
  try {
    const pk = await eztz.utility.b58cencode(eztz.utility.hex2buf(publicKey.substr(2)), eztz.prefix.edpk)
    const pkh = await eztz.utility.b58cencode(
      eztz.library.sodium.crypto_generichash(
        20,
        eztz.utility.b58cdecode(pk, eztz.prefix.edpk)
      ),
      eztz.prefix.tz1
    )
    return { pk, pkh }
  } catch (e) {
    throw e
  }
}

export const getAddress = async (path) => {
  try {
    const transport = await Transport.create()
    const xtz = new App(transport)
    const { publicKey } = await xtz.getAddress(path, true)
    const { pk, pkh } = await genAddress(publicKey)
    return { pk, pkh }
  } catch (err) {
    throw err
  }
}

export const signOperation = async (path, opBytes) => {
  try {
    const transport = await Transport.create()
    const xtz = new App(transport)
    const result = await xtz.signOperation(path, opBytes)
    return result.signature
  } catch (err) {
    throw err
  }
}

export const getVersion = async () => {
  try {
    const transport = await Transport.create()
    const xtz = new App(transport)
    const versionInfo = await xtz.getVersion()
    return versionInfo
  } catch (err) {
    throw err
  }
}

export const signTransaction = async (opbytes, opOb, HDPath) => {
  try {
    const signature = await signOperation(HDPath, `03${opbytes}`)
    opOb.signature = await eztz.utility.b58cencode(eztz.utility.hex2buf(signature), eztz.prefix.edsig)
    const res = await eztz.rpc.inject(opOb, opbytes + signature)
    const { hash, operations } = res
    return { hash, operations }
  } catch (err) {
    throw err
  }
}
