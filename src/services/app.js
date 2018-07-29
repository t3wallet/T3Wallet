import eztz from 'utils/eztz'

export const setNetworkProvider = (network) => {
  eztz.node.setProvider(network)
}

export const getBlockHead = async () => {
  try {
    const block = await eztz.rpc.getHead()
    return block
  } catch (e) {
    console.log(e)
    throw e
  }
}
