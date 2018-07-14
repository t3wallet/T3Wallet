import sotez from 'sotez'

export const setNetworkProvider = (network) => {
  sotez.node.setProvider(network)
}
