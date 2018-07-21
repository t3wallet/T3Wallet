import eztz from 'utils/eztz'
import axios from 'axios'
import { flatten } from 'lodash'

const apiPoint = 'http://api5.tzscan.io/v2/'

export const loadAccount = async (pkh) => {
  try {
    let balance
    balance = await eztz.rpc.getBalance(pkh)
    balance = await eztz.utility.totez(parseInt(balance, 10))
    return balance
  } catch (error) {
    throw error
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
    console.log('[KT accounts]', res.data)
    accounts = res.data.map((acc) => {
      const ops = acc.type.operations
      return ops.map((op) => {
        return op
      })
    })
    return flatten(accounts)
  } catch (error) {
    console.log(error)
    return []
  }
}


export const sendToken = async (toAddress, fromAddress, keys, amount, gas, gasLimit, data = undefined) => {
  try {
    let response
    if (data) {
      console.log('called with data')
      response = await eztz.contract.send(toAddress, fromAddress, keys, amount, data, gas)
    } else {
      console.log('called without data')
      response = await eztz.rpc.transfer(fromAddress, keys, toAddress, amount, gas, data, gasLimit)
    }
    const { hash, operations } = response
    return { hash, operations }
  } catch (error) {
    throw error
  }
}

export const originateAccount = async (keys) => {
  try {
    const response = await eztz.rpc.account(keys, 0, true, true, keys.pkh, 0)
    console.log(response)
    const { hash } = response
    const address = await eztz.contract.hash(hash, 0)
    return { hash, address }
  } catch (error) {
    throw error
  }
}
