import blowfish from 'blowfish-js';
import { decode, encode, toBuffer } from "../utils/data-helper";
import crypto from "crypto-browserify"

const BFKeySize = 256
const BFIVSize = 8

const performBFOFBRun = async (data, n) => {
    const encryptTimings = new Array(n)
    const decryptTimings = new Array(n)

    const key = crypto.randomBytes(BFKeySize)

    const encodedData = toBuffer(data)

    let encryptedData, decryptedData, start, end;

    for (let i = 0; i < n; i++) {
        start = performance.now()

        const iv = crypto.randomBytes(BFIVSize)
        const context = blowfish.key(key)

        encryptedData = await Promise.all(encodedData.map(async (dataPoint) => {
            return blowfish.ofb(context, iv, dataPoint)
        }))
        
        end = performance.now()

        encryptTimings[i] = end - start;

        start = performance.now()

        decryptedData = await Promise.all(encryptedData.map(async (dataPoint) => {
            return blowfish.ofb(context, iv, dataPoint, true)
        }))
    
        end = performance.now()

        decryptTimings[i] = end - start;
    }

    const decodedData = decode(decryptedData)

    return {decodedData, encryptTimings, decryptTimings}
}

export default performBFOFBRun