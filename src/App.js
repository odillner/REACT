import { useState } from "react";
import runFullSuite from "./utils/full-suite";

function App() {
  const [dataSetSize, setDataSetSize] = useState(100)
  const [numberOfRuns, setNumberOfRuns] = useState(10)
  const [deviceBrand, setDeviceBrand] = useState("SAMSUNG")
  const [deviceModel, setDeviceModel] = useState("SAMSUNG")
  const [deviceOS, setDeviceOS] = useState("SAMSUNG")

  const start = () => {
    runFullSuite(dataSetSize, numberOfRuns, deviceBrand, deviceModel, deviceOS)
  }

  return (
    <div>
        <p>{window.navigator.userAgent}</p>

        <p>Data set size:</p>

        <input
          value={dataSetSize}
          onChange={e => setDataSetSize(e.target.value)}
        />

        <p>Number of runs:</p>

        <input
          value={numberOfRuns}
          onChange={e => setNumberOfRuns(e.target.value)}
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

        <br/>
      <button onClick={() => {
          start()
      }}>START</button>
    </div>
  );
}

export default App;
