import eztz from 'utils/eztz'

export const setNetworkProvider = (network) => {
  eztz.node.setProvider(network)
}
