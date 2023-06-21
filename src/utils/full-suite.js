import { getByName } from "../crypt"
import dataService from "../services/data"
import { encode, decode, getDataSet, toBuffer, getAverage, sleep} from "./data-helper"

const run = async (algorithmName, dataSetSize, numberOfRuns, deviceBrand, deviceModel, deviceOS, setCurrentOperation, keyGeneration) => {
    console.log("Fetching dataset...")

    const dataSet = getDataSet(dataSetSize)
    const encodedData = encode(dataSet)
    const bufferData = toBuffer(dataSet)

    const algorithm = getByName(algorithmName)

    const encryptTimings = new Array(numberOfRuns)
    const decryptTimings = new Array(numberOfRuns)
    const keyGenTimings = new Array(numberOfRuns)

    console.log(`Starting ${algorithm.name}...`)

    const data = (algorithm.name === "BF-CBC") ? bufferData : encodedData

    let encryptedData = new Array(data.length)
    let decryptedData = new Array(data.length)

    let start, end

    const key = await algorithm.generateKey()

    console.log("Starting key generation")
    setCurrentOperation("KEY GENERATION")

    if (keyGeneration) {
        for (let i = 0; i < numberOfRuns; i++) {
            start = performance.now()

            const promises = new Array(data.length)

            for (let j = 0; j < data.length; j++) {
                promises[i] = algorithm.generateKey()
            }

            await Promise.all(promises)

            end = performance.now()

            keyGenTimings[i] = end - start;


            setCurrentOperation("KEY GENERATION" + i)
        }
    }

    setCurrentOperation("SLEEPING")
    await sleep(5000)
    setCurrentOperation("ENCRYPTION")

    console.log("Starting encryption")

    for (let i = 0; i < numberOfRuns; i++) {
        start = performance.now()

        encryptedData = await Promise.all(data.map(async (dataPoint) => {
            return algorithm.encryptData(dataPoint, key)
        }))

        end = performance.now()

        encryptTimings[i] = end - start;


        setCurrentOperation("ENCRYPTION" + i)
    }

    setCurrentOperation("SLEEPING")
    await sleep(5000)
    setCurrentOperation("DECRYPTION")

    console.log("Starting decryption")

    for (let i = 0; i < numberOfRuns; i++) {
        start = performance.now()

        decryptedData = await Promise.all(encryptedData.map(async (dataPoint) => {
            return algorithm.decryptData(dataPoint, key)
        }))
    
        end = performance.now()

        decryptTimings[i] = end - start;

        setCurrentOperation("DECRYPTION" + i)
    }

    if (algorithm.name == "RSA-PSS" || algorithm.name == "ECDSA-P521") {
        if (decryptedData.every(dataPoint => dataPoint === true)) {
            console.log(`Encrypted and decrypted data matches original dataset`)
        } else {
            console.log(`Encrypted and decrypted data does not match`)
        }
    } else {
        const decodedData = (algorithm.name === "BF-CBC") ? decryptedData.map(dataPoint => JSON.parse(dataPoint)) : decode(decryptedData)

        if (JSON.stringify(decodedData) == JSON.stringify(dataSet)) {
            console.log(`Encrypted and decrypted data matches original dataset`)
        } else {
            console.log(`Encrypted and decrypted data does not match`)
        }
    }


    const avgKeyGenCPU = 0 //prompt("keygencpu")/100;
    const avgEncryptCPU = 0 //prompt("encryptcpu")/100
    const avgDecryptCPU = 0 //prompt("decryptcpu")/100

    const avgKeyGenMem = 0 //parseFloat(prompt("keygenmem"))
    const avgEncryptMem = 0 //parseFloat(prompt("encryptmem"))
    const avgDecryptMem = 0 //parseFloat(prompt("decryptmem"))

    setCurrentOperation("UPLOADING")

    await dataService.upload({
        platform: "WEB",
        type: "INDIVIDUAL",
        algorithm: algorithm.name,
        dataSetSize,
        numberOfRuns,

        avgEncryptTime: getAverage(encryptTimings),
        avgEncryptMem,
        avgEncryptCPU,

        avgDecryptTime: getAverage(decryptTimings),
        avgDecryptMem,
        avgDecryptCPU,

        avgKeyGenTime: (keyGeneration) ? getAverage(keyGenTimings) : 0,
        avgKeyGenMem,
        avgKeyGenCPU,

        deviceBrand,
        deviceModel,
        deviceOS
    })

    setCurrentOperation("DONE")
}

export default run