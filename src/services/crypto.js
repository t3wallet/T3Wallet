import eztz from 'utils/eztz'

export const generateMnemonic = () => {
  return eztz.crypto.generateMnemonic()
}
