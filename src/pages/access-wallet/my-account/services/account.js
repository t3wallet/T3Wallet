import eztz from 'utils/eztz'

export const loadAccount = async (pkh) => {
  try {
    let balance
    balance = await eztz.rpc.getBalance(pkh)
    balance = await eztz.utility.totez(parseInt(balance, 10))
    return balance
  } catch (error) {
    return { success: false, error }
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
    console.log(keys)
    const response = await eztz.rpc.account(keys, 0, true, true, keys.pkh, 0)
    const { hash } = response
    const address = await eztz.contract.hash(hash, 0)
    return address
  } catch (error) {
    throw error
  }
}
