/* web crypto aes-cbc */

const keySize = 256
const IVSize = 16
const name = "AES-CBC"

const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name,    
            length: keySize,
        },
        false,
        ["encrypt", "decrypt"]
    )

    return key
}


const encryptData = async (data, key) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(IVSize));

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name,
            iv
        },
        key,
        data
    )
    
    return {encryptedData, iv}
}

const decryptData = async ({encryptedData, iv}, key) => {
    let result = await window.crypto.subtle.decrypt(
        {
            name,
            iv
        },
        key,
        encryptedData
    )

    return result
}

const AESCBC = {generateKey, encryptData, decryptData, name}

export default AESCBC