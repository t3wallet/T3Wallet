import sotez from 'sotez'

export const loadAccount = async (pkh) => {
  try {
    let balance
    balance = await sotez.rpc.getBalance(pkh)
    balance = sotez.utility.totez(parseInt(balance, 10))
    return { success: true, balance }
  } catch (error) {
    return { success: false, error }
  }
}


export const sendToken = (toAddress, fromAddress, keys, amount, gas, data) => {
  try {
    let operation;
    if (data) {
      operation = sotez.contract.send(toAddress, fromAddress, keys, amount, data, gas);
    } else {
      operation = window.eztz.rpc.transfer(fromAddress, keys, toAddress, amount, gas);
    }
    operation.then(res => {
      return { success: true }
    }).catch(error => {
      console.log(error)
      throw new Error('Send Operation Failed!')
    })
    
  } catch (error) {
    throw new Error('Send Operation Failed!')
  }
}