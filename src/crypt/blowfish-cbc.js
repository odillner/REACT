/* non-webcrypto bf-cbc, uses node polyfills */

import crypto from "crypto-browserify"
import Blowfish from 'egoroof-blowfish';

const keySize = 256
const IVSize = 8
const name = "BF-CBC"

const generateKey = async () => {
    return new Blowfish(crypto.randomBytes(keySize/2).toString('hex'), Blowfish.MODE.CBC, Blowfish.PADDING.PKCS5);
}

const encryptData = async (data, key) => {
    const iv = (crypto.randomBytes(IVSize/2).toString('hex'))

    key.setIv(iv)

    const encryptedData = await key.encode(data)

    return {iv, encryptedData}
}


const decryptData = async ({iv, encryptedData}, key) => {
    key.setIv(iv)

    return await key.decode(encryptedData)
}

const BFCBC = {generateKey, encryptData, decryptData, name}

export default BFCBC