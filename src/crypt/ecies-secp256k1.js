import {encrypt, decrypt, generateKeyPair} from 'eccrypto-js'
import { decode, encode } from "../utils/data-helper";


const performECIESRun = async (data, n) => {
    const encryptTimings = new Array(n);
    const decryptTimings = new Array(n);

    const key = generateKeyPair()

    const encodedData = encode(data)

    let encryptedData, decryptedData, start, end;

    for (let i = 0; i < n; i++) {
        start = performance.now()

        encryptedData = await Promise.all(encodedData.map(async (dataPoint) => {
            return encrypt(key.publicKey, dataPoint)
        }))
        
        end = performance.now()

        encryptTimings[i] = end - start;

        start = performance.now()

        decryptedData = await Promise.all(encryptedData.map(async (dataPoint) => {
            return decrypt(key.privateKey, dataPoint)
        }))
    
        end = performance.now()

        decryptTimings[i] = end - start;
    }

    const decodedData = decode(decryptedData)

    return {decodedData, encryptTimings, decryptTimings}
}

export default performECIESRun