import { decode, encode } from "../utils/data-helper";

const AESKeySize = 256
const AESIVSize = 12

const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',    
            length: AESKeySize,
        },
        false,
        ["encrypt", "decrypt"]
    )

    return key
}


const encrypt = async (data, key) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(AESIVSize));

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        data
    )
    
    return {encryptedData, iv}
}

const decrypt = async (data, key, iv) => {
    let result = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        data
    )

    return result
}


const performAESGCMRun = async (data, n) => {
    const encryptTimings = new Array(n);
    const decryptTimings = new Array(n);

    const key = await generateKey();

    const encodedData = encode(data)

    let encryptedData, decryptedData, start, end;

    for (let i = 0; i < n; i++) {
        start = performance.now()

        encryptedData = await Promise.all(encodedData.map(async (dataPoint) => {
            return encrypt(dataPoint, key)
        }))
        
        end = performance.now()

        encryptTimings[i] = end - start;

        start = performance.now()

        decryptedData = await Promise.all(encryptedData.map(async (dataPoint) => {
            return decrypt(dataPoint.encryptedData, key, dataPoint.iv)
        }))
    
        end = performance.now()

        decryptTimings[i] = end - start;
    }

    const decodedData = decode(decryptedData)

    return {decodedData, encryptTimings, decryptTimings}
}

export default performAESGCMRun