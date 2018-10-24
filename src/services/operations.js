import eztz from 'utils/eztz'
import axios from 'axios'
import { flatten } from 'lodash'

const apiPoint = 'https://api5.tzscan.io/v2/'

export const loadAccountInfo = async (pkh) => {
  try {
    const info = await eztz.node.query(`/chains/main/blocks/head/context/contracts/${pkh}`)
    return { ...info, balance: await eztz.utility.totez(parseInt(info.balance, 10)) }
  } catch (error) {
    return (error)
  }
}

export const loadKTAccounts = async (pkh) => {
  try {
    let accounts = []
    const res = await axios({
      url: `/operations/${pkh}`,
      baseURL: apiPoint,
      params: {
        type: 'Origination',
        p: 0,
      },
    })
    accounts = flatten(res.data.map((acc) => {
      const ops = acc.type.operations
      return ops.map((op) => {
        return op
      })
    }))

    accounts = accounts.map((account) => {
      const { tz } = account.tz1
      return { address: tz, prefix: (tz.slice(0, 2)), kind: 'origination' }
    })
    return accounts
  } catch (error) {
    console.log(error)
    return []
  }
}

/**
 *
 * @param kind: ['delegation', 'transaction', 'origination']
 * @param payload [
 *    if kind === 'transaction':
 *          {toAddress, fromAddress, keys, amount, fee, gasLimit, data = undefined}
 *    if kind ===  'delegation'
 *          {fromAddress, keys, toDelegation, fee}
 *    if kind === 'origination'
 *          { keys }
 * ]
 */
export const genUnsignedTransaction = async (kind, payload) => {
  let res
  if (kind === 'transaction') {
    const {
      toAddress, fromAddress, keys: ks, amount, fee, gasLimit, data,
    } = payload
    let keys = {}
    typeof ks.sk !== 'undefined' ? keys = { ...ks, sk: undefined } : keys = ks
    try {
      if (data) {
        res = await eztz.contract.send(toAddress, fromAddress, keys, amount, data, fee)
      } else {
        res = await eztz.rpc.transfer(fromAddress, keys, toAddress, amount, fee, data, gasLimit)
      }
      if (!res.opbytes || !res.opOb) throw new Error('Operation Failed')
      return res // { opbytes, opOb }
    } catch (err) {
      throw err
    }
  } else if (kind === 'origination') {
    const { keys: ks } = payload
    let keys = {}
    typeof ks.sk !== 'undefined' ? (keys = { ...ks, sk: undefined }) : keys = ks
    try {
      res = await eztz.rpc.account(keys, 0, true, true, undefined, 0)
      if (!res.opbytes || !res.opOb) throw new Error('Operation Failed')
      return res // { opbytes, opOb }
    } catch (err) {
      throw err
    }
  } else if (kind === 'delegation') {
    const {
      fromAddress, keys: ks, toDelegation, fee,
    } = payload
    let keys = {}
    typeof ks.sk !== 'undefined' ? (keys = { ...ks, sk: undefined }) : keys = ks
    try {
      res = await eztz.rpc.setDelegate(fromAddress, keys, toDelegation, fee)
      if (!res.opbytes || !res.opOb) throw new Error('Operation Failed')
      return res // { opbytes, opOb }
    } catch (err) {
      throw err
    }
  }
  return res
}

export const injectTransaction = async (opbytes, opOb, signature) => {
  try {
    opOb.signature = eztz.utility.b58cencode(
      eztz.utility.hex2buf(signature),
      eztz.prefix.edsig
    )
    const res = await eztz.rpc.inject(opOb, opbytes + signature)
    const { hash, operations } = res
    return { hash, operations }
  } catch (err) {
    return { error: true, ...err.statusCode }
  }
}

export const sendToken = async (toAddress, fromAddress, keys, amount, fee, gasLimit, data = undefined) => {
  let response
  try {
    if (data) {
      response = await eztz.contract.send(toAddress, fromAddress, keys, amount, data, fee)
    } else {
      response = await eztz.rpc.transfer(fromAddress, keys, toAddress, amount, fee, data, gasLimit)
    }
    const { hash, operations } = response
    return { hash, operations }
  } catch (err) {
    throw err
  }
}

export const originateAccount = async (keys) => {
  try {
    const response = await eztz.rpc.account(keys, 0, true, true, undefined, 0)
    console.log('[ORIGINATION SUCCESS]', response)
    const { hash, operations } = response
    const address = await eztz.contract.hash(hash, 0)
    console.log('[KT address]', address)
    return { hash, operations, address }
  } catch (error) {
    console.log('[Origination Error]', error)
    throw error
  }
}

export const genAddress = async (hash) => {
  const address = await eztz.contract.hash(hash, 0)
  return address
}

export const setDelegation = async (fromAddress, keys, toDelegation, fee) => {
  try {
    console.log(fromAddress, keys, toDelegation, fee)
    const response = await eztz.rpc.setDelegate(fromAddress, keys, toDelegation, fee) // { hash, operations }
    console.log('[SET DELEGATION SUCCESS]', response)
    return response
  } catch (error) {
    console.log('[SET DELEGATION ERROR]', error)
    throw error
  }
}
