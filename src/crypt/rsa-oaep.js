import {decode, encode, chunk, dechunk} from "../utils/data-helper";

const RSAKeySize = 2048

const generateKeyPair = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: RSAKeySize, 
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-256"},
        },
        false,
        ["encrypt", "decrypt"]
    )

    return key
}

const encrypt = async (data, key) => {
    const res = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        key.publicKey, 
        data 
    )

    return res
}

const decrypt = async (data, key) => {
    const res = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        key.privateKey, 
        data 
    )

    return res
}


const performRSAOAEPRun = async (data, n) => {
    const encryptTimings = new Array(n);
    const decryptTimings = new Array(n);

    const key = await generateKeyPair();

    const encodedData = encode(data)

    let encryptedData, decryptedData, start, end;

    for (let i = 0; i < n; i++) {
        start = performance.now()

        encryptedData = await Promise.all(encodedData.map(async (dataPoint) => {
            const chunks = chunk(dataPoint, 100)
    
            return await Promise.all(chunks.map(chunk => encrypt(chunk, key)))
        }))
    
        end = performance.now()

        encryptTimings[i] = end - start;

        start = performance.now()

        decryptedData = await Promise.all(encryptedData.map(async (dataPoint) => {
            const chunks = await Promise.all(dataPoint.map(chunk => decrypt(chunk, key)))
    
            return dechunk(chunks)
        })) 
    
        end = performance.now()

        decryptTimings[i] = end - start;
    }

    const decodedData = decode(decryptedData)

    return {decodedData, encryptTimings, decryptTimings}
}

export default performRSAOAEPRun