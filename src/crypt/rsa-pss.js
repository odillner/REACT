/* web crypto rsa-pss */

const keySize = 2048
const saltLength = 128

const name = "RSA-PSS"

const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name,
            modulusLength: keySize, 
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-256"},
        },
        false,
        ["sign", "verify"]
    )

    return key
}

const encryptData = async (data, key) => {
    const signature = await window.crypto.subtle.sign(
        {
            name,
            saltLength
        },
        key.privateKey, 
        data
    )
    

    return {data, signature}
}

const decryptData = async ({data, signature}, key) => {
    const res = await window.crypto.subtle.verify(
        {
            name,
            saltLength
        },
        key.publicKey,
        signature,
        data
    )
    

    return res
}

const RSAPSS = {generateKey, encryptData, decryptData, name}

export default RSAPSS