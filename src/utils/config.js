/* Used to import environment variables */
let API_URL = process.env.REACT_APP_API_URL

if (process.env.NODE_ENV === 'production') {
    API_URL = '/'
}

export {
    API_URL,
}