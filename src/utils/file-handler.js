/* eslint-disable */
import Ethereum from './ethereum'

export function readFile(file, reader, upload) {
  let keyStoreObject = ''
  const walletProperties = [
    'address',
    'crypto',
    'id',
    'version'
  ]
  try {
    let keyStore = upload.target.result
    if (keyStore.includes('Crypto')) {
      keyStore = keyStore.replace('Crypto', 'crypto')
    }

    keyStoreObject = JSON.parse(keyStore)
    const walletAddress = keyStoreObject.address

    if (keyStoreObject.version !== 3) {
      throw new Error('NOT_V3')
    }
    if (!walletAddress
        || walletAddress === ''
        || !Ethereum.validateAddress(`0x${walletAddress}`)) {
      throw new Error('INVALID_ADDRESS')
    }

    for (let i in walletProperties) {
      if (!keyStoreObject.hasOwnProperty(walletProperties[i])) {
        throw new Error('MISS_PROPERTIES')
      }
    }
    console.log('file import', true)
    return JSON.stringify(keyStoreObject)
  } catch (err) {
    console.log('file import', false)
    return ''
  }
}
