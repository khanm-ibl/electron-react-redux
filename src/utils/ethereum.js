/* eslint-disable */
var HDKey = require('ethereumjs-wallet/hdkey');
var Wallet = require('ethereumjs-wallet');
var Util = require('ethereumjs-util');
var Transaction = require('ethereumjs-tx');
var Abi = require('ethereumjs-abi');
var Bip39 = require('bip39');
const ethFunctions = require('./ethereum-functions.js')
const BigNumber = require('bignumber.js')
const Units = require('ethereumjs-units')


let Ethereum = {};
Ethereum.HDPathString = "m/44'/60'/0'/0";
Ethereum.GasLimit = 300000;
Ethereum.GasPrice = 20000000000;

/**
 * get wallet from seed
 * @return {object} Wallet object
 */
Ethereum.getWallet = (mnemonic, path, child) => {
    if (mnemonic === undefined || mnemonic === null || mnemonic === '')
        mnemonic = Bip39.generateMnemonic();
    let masterSeed = Bip39.mnemonicToSeed(mnemonic);
    let _wallet = HDKey.fromMasterSeed(masterSeed).derivePath(path || Ethereum.HDPathString).deriveChild(child || 0).getWallet();
    return _wallet;
}

/**
 * get wallet
 * @return {object} Wallet object
 */
Ethereum.getWallet = () => {
    return Wallet.generate();
};

/**
 *  Import a version 3 of the Ethereum wallet format.
 * @param {string} input
 * @param {string} password
 * @return {object} Wallet object
 */
Ethereum.fromV3 = (input, password) => {
    return Wallet.fromV3(input, password);
}

/**
 * get wallet info
 * @return {object} Wallet object
 */
Ethereum.createWalletFromSeed = (mnemonic, path, child) => {
    let _wallet = Ethereum.getWallet(mnemonic, path, child);
    if (_wallet !== null) {
        return {
            address: _wallet.getAddressString(),
            privateKey: _wallet.getPrivateKeyString()
        };
    }
    return null;
}

/**
 * Validate ethereum address
 * @param {string} address
 * @return {boolean}
 */
Ethereum.validateAddress = (address) => {
    return Util.isValidAddress(address.toLowerCase());
}

/**
 * get ethereum private key from mnemonic
 * @param {string} mnemonic
 * @return {string} private key
 */
Ethereum.getPrivateKey = function (mnemonic) {
    let _wallet = Ethereum.getWallet(mnemonic);
    if (_wallet !== null) {
        return _wallet.getPrivateKeyString();
    }
    return '';
}

/**
 * get ethereum private key from mnemonic
 * @param {string} address
 * @return {string} address
 */
Ethereum.getAddress = (mnemonic) => {
    let _wallet = Ethereum.getWallet(mnemonic);
    if (_wallet !== null) {
        return _wallet.getAddressString();
    }
    return '';
}

/**
 * Create raw transaction
 *
 * @example
 *  var txParams = {
 *      from: "0x9c729ef4cec1b1bdffaa281c2ff76b48fdcb874c",
 *      to: "0xfd2921b8b8f0dccf65d4b0793c3a2e5c127f3e86",
 *      value: 12,
 *      nonce: 1,
 *      gasLimit: 300000,
 *      gasPrice: 20000000000,
 *      privateKey: '',
 *      nameFunc: 'commit', //Smart contract
 *      typeParams: ['uint256', 'bytes32'], //Smart contract
 *      paramsFuncs: [1, 2], //Smart contract
 *  };
 */
Ethereum.createRawTx = (txParams) => {
    if (txParams.privateKey === undefined || txParams.privateKey === '' ||
        txParams.nonce === undefined || txParams.value === undefined || txParams.to === undefined)
        return '';
    let transaction = new Transaction();

    if (txParams.gasLimit === undefined) {
        txParams.gasLimit = Ethereum.GasLimit;
    }
    if (txParams.gasPrice === undefined) {
        txParams.gasPrice = Ethereum.GasPrice;
    }

    transaction.to = txParams.to;
    transaction.gasLimit = txParams.gasLimit * 1; // in wei
    transaction.gasPrice = txParams.gasPrice * 1; // in wei
    transaction.nonce = txParams.nonce * 1;
    transaction.value = txParams.value * 1; // in wei

    if (txParams.data !== undefined && txParams.data !== '') {
        transaction.data = txParams.data;
    }
    else if (txParams.nameFunc !== undefined && txParams.nameFunc !== '' &&
        txParams.typeParams !== undefined && txParams.paramsFuncs !== undefined) {
        let _data = Ethereum.getDataSmartContract(txParams.nameFunc, txParams.typeParams, txParams.paramsFuncs);
        transaction.data = '0x' + _data;
    }

    try {
        let privateKey = txParams.privateKey;
        privateKey = new Buffer(privateKey, 'hex');
        transaction.sign(new Buffer(privateKey), "hex");
        return "0x" + transaction.serialize().toString("hex");
    } catch (error) {
        if (txParams.privateKey.indexOf('0x') === 0) {
            try {
                let privateKey = txParams.privateKey.substr(2);
                privateKey = new Buffer(privateKey, 'hex');
                transaction.sign(new Buffer(privateKey), "hex");
                return "0x" + transaction.serialize().toString("hex");
            } catch (error) {
                return '';
            }
        }
    }
    return '';
}

/**
 * Get function smart contract
 * @Param {string} nameFunction (ex: 'nameFunction')
 * @Param {arrayString} typeParams (ex: [ 'bytes', 'bool', 'uint256[]' ])
 * @Param {array} Params (ex: [ 'bytes', 'bool', 'uint256[]' ], [ 'dave', true, [ 1, 2, 3 ] ])
 * @return {string} method id
 */
Ethereum.getDataSmartContract = (nameFunction, typeParams, Params) => {
    return Abi.methodID(nameFunction, typeParams).toString('hex') + Abi.rawEncode(typeParams, Params).toString('hex');
}

module.exports = Ethereum;