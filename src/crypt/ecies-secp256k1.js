import {generateKeyPair, encrypt, decrypt} from 'eccrypto-js'

const name = "ECIES-SECP256K1"

const generateKey = async () => {
    return generateKeyPair()
}

const encryptData = async (data, key) => {
    return await encrypt(key.publicKey, data)
}

const decryptData = async (data, key) => {
    return await decrypt(key.privateKey, data)
}

const ECIES = {generateKey, encryptData, decryptData, name}

export default ECIES