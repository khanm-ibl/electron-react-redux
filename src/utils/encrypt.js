var SHA512 = require("crypto-js/sha512");
var CryptoJS = require("crypto-js");
var SHA3 = require('js-sha3');

export default class Encrypt {

    encryptString(string, password) {
        return CryptoJS.AES.encrypt(string, SHA512(password).toString()).toString();
    };

    decryptString(encryptedStr, password) {
        var bytes = CryptoJS.AES.decrypt(encryptedStr, SHA512(password).toString());
        try {
            return bytes.toString(CryptoJS.enc.Utf8).replace('0x', '');
        } catch (e) {
            return "";
        }
    };

    sha512(password) {
        return SHA512(password).toString();
    };

    sha3(msg) {
        console.log('SHA3', SHA3)
        return SHA3.keccak_256(msg);
    }
}
