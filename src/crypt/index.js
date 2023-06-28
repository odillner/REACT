/* central module to fetch various algorithm implementations */

import AESGCM from "./aes-gcm"
import BFCBC from "./blowfish-cbc"
import ECIES from "./ecies-secp256k1"
import RSAOAEP from "./rsa-oaep"
import AESCTR from "./aes-ctr"
import AESCBC from "./aes-cbc"
import RSAPSS from "./rsa-pss"
import ECDSAP521 from "./ecdsa-p521"

const algorithms = [
    AESGCM,
    AESCTR,
    AESCBC,
    BFCBC,
    ECIES,
    RSAOAEP,
    RSAPSS,
    ECDSAP521
]

export const getByName = (name) => {
    switch (name) {
        case "AES-GCM": return AESGCM
        case "AES-CBC": return AESCBC
        case "AES-CTR": return AESCTR
        case "BF-CBC": return BFCBC
        case "ECIES-SECP256K1": return ECIES
        case "RSA-OAEP": return RSAOAEP
        case "RSA-PSS": return RSAPSS
        case "ECDSA-P521": return ECDSAP521
    }
}



export default algorithms