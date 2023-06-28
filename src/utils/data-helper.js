/* Module used containing various helper functions */
import dataSet100 from "../data/100.json"
import dataSet1000 from "../data/1000.json"
import dataSet10000 from "../data/10000.json"

/* various encoding and decoding functions */
const encode = (data) => {
    const encoder = new TextEncoder();

    const encodedData = data.map(dataPoint => encoder.encode(JSON.stringify(dataPoint)))

    return encodedData;
}

const decode = (data) => {
    const decoder = new TextDecoder();

    const decodedData = data.map(dataPoint => JSON.parse(decoder.decode(dataPoint)))

    return decodedData;
}

const toBuffer = (data) => {
    const encodedData = data.map(dataPoint => Buffer.from(JSON.stringify(dataPoint)), 'utf8')

    return encodedData
}

const fromBuffer = (data) => {
    const decodedData = data.map(dataPoint => JSON.parse(dataPoint.toString()))

    return decodedData
}

/* chunking and dechunking for rsa */
const chunk = (data, size) => {
    const chunks = []

    for (let i = 0; i < data.length; i += size) {
        const chunk = data.slice(i, i + size);
        chunks.push(chunk);
    }

    return chunks
}

const dechunk = (chunks) => {
    chunks = chunks.map(chunk => new Uint8Array(chunk))

    let length = 0

    chunks.forEach(chunk => {
        length += chunk.length
    })

    let merged = new Uint8Array(length);
    let pos = 0;

    chunks.forEach(chunk => {
        merged.set(chunk, pos)
        pos += chunk.length
    })

    return merged
}

/* hacky way to sleep between operations */
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getAverage = (data) => {
    return data.reduce((a, b) => a + b) / data.length
}

const getDataSet = (size) => {
    switch(size) {
        case 100:
          return dataSet100
        case 1000:
          return dataSet1000
        case 10000:
          return dataSet10000
        default:
          return dataSet10000
      } 
}

export {encode, decode, chunk, dechunk, toBuffer, getAverage, getDataSet, sleep}