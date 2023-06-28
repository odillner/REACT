/* web crypto ecdsa */

const namedCurve = "P-521"
const name = "ECDSA-P521"

const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve
        },
        false,
        ["sign", "verify"]
    )

    return key
}

const encryptData = async (data, key) => {
    const signature = await window.crypto.subtle.sign(
        {
            name: "ECDSA",
            hash: "SHA-256"
        },
        key.privateKey, 
        data
    )
    

    return {data, signature}
}

const decryptData = async ({data, signature}, key) => {
    const res = await window.crypto.subtle.verify(
        {
            name: "ECDSA",
            hash: "SHA-256"
        },
        key.publicKey,
        signature,
        data
    )
    

    return res
}

const ECDSAP521 = {generateKey, encryptData, decryptData, name}

export default ECDSAP521