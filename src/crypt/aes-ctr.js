const keySize = 256
const counterSize = 16
const blockSize = 64
const name = "AES-CTR"

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
    const counter = window.crypto.getRandomValues(new Uint8Array(counterSize));

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name,
            counter,
            length: blockSize
        },
        key,
        data
    )
    
    return {encryptedData, counter}
}

const decryptData = async ({encryptedData, counter}, key) => {
    let result = await window.crypto.subtle.decrypt(
        {
            name,
            counter,
            length: blockSize
        },
        key,
        encryptedData
    )

    return result
}

const AESCTR = {generateKey, encryptData, decryptData, name}

export default AESCTR