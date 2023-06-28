## REACT

This is the Web benchmarking module of the thesis work. It performs the benchmarks in a given browser environment. 

## Usage

This application is developed using node.js and NPM and as such requires these frameworks to be installed. 

This application also requires some initial setup, you need to create an .env file containing certain configurations, among others an url pointing towards an active instance of the DATA-GATHERER application. You can either deploy this application or use an already deployed instance to which the resulting performance metrics will be sent. 
See the .env.example for more information.

In order to run the module on a smartphone device, simply start the application on a network connected device, open the ports on which the application is running and navigate to the application, for example:

https://192.168.0.1:3000

The supplemental metrics such as CPU and memory utilizations need to be gathered using appropriate performance profilers
such as Firefox or Chrome Devtools utilities. 

In the project directory, you can run:

### `npm install`

Installs all dependencies. 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
