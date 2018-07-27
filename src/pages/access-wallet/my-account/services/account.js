import eztz from 'utils/eztz'
import axios from 'axios'
import { flatten } from 'lodash'

const apiPoint = 'http://api5.tzscan.io/v2/'

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

export const sendToken = async (toAddress, fromAddress, keys, amount, gas, gasLimit, data = undefined) => {
  try {
    let response
    if (data) {
      console.log('[called with data]')
      response = await eztz.contract.send(toAddress, fromAddress, keys, amount, data, gas)
    } else {
      console.log('[called without data]')
      response = await eztz.rpc.transfer(fromAddress, keys, toAddress, amount, gas, data, gasLimit)
    }
    const { hash, operations } = response
    console.log(response)
    return { hash, operations }
  } catch (error) {
    throw error
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

export const setDelegation = async (fromAddress, keys, toDelegation, gas) => {
  try {
    console.log(fromAddress, keys, toDelegation, gas)
    const response = await eztz.rpc.setDelegate(fromAddress, keys, toDelegation, gas) // { hash, operations }
    console.log('[SET DELEGATION SUCCESS]', response)
    return response
  } catch (error) {
    console.log('[SET DELEGATION ERROR]', error)
    throw error
  }
}
