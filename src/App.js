/* frontend for interracting with benchmarking module */

import { useState } from "react";
import runFullSuite from "./utils/full-suite";

function App() {
  const [dataSetSize, setDataSetSize] = useState(10000)
  const [numberOfRuns, setNumberOfRuns] = useState(100)
  const [algorithm, setAlgorithm] = useState("AES-CBC")
  const [deviceBrand, setDeviceBrand] = useState("SAMSUNG")
  const [deviceModel, setDeviceModel] = useState("MODEL")
  const [deviceOS, setDeviceOS] = useState("ANDROID#")
  const [currentOperation, setCurrentOperation] = useState("NONE")
  const [keyGeneration, setKeyGeneration] = useState(true);

  const start = () => {
    runFullSuite(algorithm, dataSetSize, numberOfRuns, deviceBrand, deviceModel, deviceOS, setCurrentOperation, keyGeneration)
  }

  return (
    <div>
        <p>{window.navigator.userAgent}</p>

        <select onChange={e => setAlgorithm(e.target.value)}>
          <option>AES-CBC</option>
          <option>AES-CTR</option>
          <option>AES-GCM</option>
          <option>BF-CBC</option>
          <option>ECIES-SECP256K1</option>
          <option>RSA-OAEP</option>
          <option>RSA-PSS</option>
          <option>ECDSA-P521</option>
        </select>

        <p>Data set size:</p>

        <input
          value={dataSetSize}
          onChange={e => setDataSetSize(parseInt(e.target.value))}
        />

        <p>Number of runs:</p>

        <input
          value={numberOfRuns}
          onChange={e => setNumberOfRuns(parseInt(e.target.value))}
        />

        <p>Device brand:</p>

        <input
          value={deviceBrand}
          onChange={e => setDeviceBrand(e.target.value)}
          />

        <p>Device model:</p>

        <input
          value={deviceModel}
          onChange={e => setDeviceModel(e.target.value)}
        />

        <p>Device OS:</p>

        <input
          value={deviceOS}
          onChange={e => setDeviceOS(e.target.value)}
        />

      <input
        type="checkbox"
        id="checkbox"
        checked={keyGeneration}
        onChange={e => setKeyGeneration(!keyGeneration)}
      />
      <label htmlFor="checkbox">Key generation</label>

        <br/>
      <button onClick={() => {
          start()
      }}>START</button>

      <p>Current operation: {currentOperation}</p>
    </div>
  );
}

export default App;
