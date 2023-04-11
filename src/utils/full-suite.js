import performAESGCMRun from "../crypt/aes-gcm"
import performBFOFBRun from "../crypt/blowfish-ofb"
import performECIESRun from "../crypt/ecies-secp256k1"
import performRSAOAEPRun from "../crypt/rsa-oaep"

import dataService from "../services/data"
import { getDataSet } from "./data-helper"

const algorithms = [
    
    {
        name: "RSA-OAEP",
        fun: performRSAOAEPRun
    },
    {
        name: "AES-GCM",
        fun: performAESGCMRun
    },
    {
        name: "ECIES-SECP256K1",
        fun: performECIESRun
    },
    {
        name: "BF-OFB",
        fun: performBFOFBRun
    }
]

const runFullSuite = async (dataSetSize, numberOfRuns, deviceBrand, deviceModel, deviceOS) => {
    console.log("Fetching dataset...")

    const platform = "REACT"
    const dataSet = getDataSet(dataSetSize)

    // for loop used to prevent simultanous running of benchmarks
    for (let i = 0; i < algorithms.length; i++) {
        console.log(`Starting ${algorithms[i].name}...`)

        const {decodedData, encryptTimings, decryptTimings} = await algorithms[i].fun(dataSet, numberOfRuns)

        if (JSON.stringify(decodedData) == JSON.stringify(dataSet)) {
            console.log(`Encrypted and decrypted data matches original dataset`)
        } else {
            console.log(`Encrypted and decrypted data does not match`)
            continue
        }

        console.log(`${algorithms[i].name} done, uploading data...`)


        await dataService.upload({
            platform,
            algorithm: algorithms[i].name,
            dataSetSize,
            encryptTimings,
            decryptTimings,
            deviceBrand,
            deviceModel,
            deviceOS
        })
    }
}

export default runFullSuite