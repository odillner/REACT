import {chunk, dechunk} from "../utils/data-helper";

const keySize = 2048
const chunkSize = 190
const name = "RSA-OAEP"

const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name,
            modulusLength: keySize, 
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-256"},
        },
        false,
        ["encrypt", "decrypt"]
    )

    return key
}

const encryptData = async (data, key) => {
    const length = Math.ceil(data.length/chunkSize)

    const res = Array(length);

    for (let i = 0; i < length; i++) {
        res[i] = await window.crypto.subtle.encrypt(
            {
                name,
            },
            key.publicKey, 
            data.slice(i * chunkSize, (i + 1) * chunkSize)
        )
    }

    return dechunk(res)
}

const decryptData = async (data, key) => {
    const length = Math.ceil(data.length/256)

    const res = Array(length)

    for (let i = 0; i < length; i++) {
        res[i] = await window.crypto.subtle.decrypt(
            {
                name,
            },
            key.privateKey,             
            data.slice(i * 256, (i + 1) * 256)
        )
    }

    return dechunk(res)
}

const RSAOAEP = {generateKey, encryptData, decryptData, name}

export default RSAOAEP