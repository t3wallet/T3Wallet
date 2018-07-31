import eztz from 'utils/eztz'

export const setNetworkProvider = (networkUrl) => {
  eztz.node.setProvider(networkUrl)
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
