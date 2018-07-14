import sotez from 'sotez'

export const loadAccount = async (pkh) => {
//   return sotez.rpc.getBalance(pkh)
  try {
    let balance
    balance = await sotez.rpc.getBalance(pkh)
    balance = sotez.utility.totez(parseInt(balance, 10))
    return { success: true, balance }
  } catch (error) {
    return { success: false, error }
  }
}
