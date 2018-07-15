import eztz from 'utils/eztz'

export const loadAccount = async (pkh) => {
  try {
    let balance
    balance = await eztz.rpc.getBalance(pkh)
    balance = eztz.utility.totez(parseInt(balance, 10))
    return { success: true, balance }
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
    return { success: true, hash, operations }
  } catch (error) {
    console.log(error)
    throw new Error('Send Operation Failed!')
  }
}
