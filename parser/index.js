/* eslint-disable */

const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const appConfigPath = path.resolve(__dirname, '..', 'src/configs', 'app.configs.js');
const appConfig = require(appConfigPath);

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// --------------------------------------------------------------------

const removeSpaces = (str) => ((str || '') + '').replace(/\s/g, '');

const isNotEmptyObject = (obj) => {
  return (typeof obj === 'object' && obj !== null && obj.constructor !== Array && Object.keys(obj).length > 0);
}

const isNotEmptyArray = (arr) => {
  return (typeof arr !== 'undefined' && arr !== null && arr.constructor === Array && arr.length > 0);
}

const getContractAddress = (key) => {
  if (mapping[key] && config.contracts[mapping[key]]) {
    return config.contracts[mapping[key]];
  }
  return null;
}

// --------------------------------------------------------------------

let config = {};
try {
  config = JSON.parse(process.env.APP_CONTRACT_CONFIG);
} catch (ex) {
  console.log('PARSE CONTRACT CONFIG ERROR: ', ex);
}

if (!isNotEmptyObject(config)) throw new Error('INVALID CONTRACT CONFIGURATIONS');

// --------------------------------------------------------------------

const mapping = {
  Privilege: 'privilege_contract_addr',
  Lotto649: 'loto649_contract_addr',
  BuyerManagement: 'buyer_management_contract_addr',
  KYC: 'kyc_contract_addr',
  PrizeFund: 'prize_fund_contract_addr',
  SellerManagement: 'seller_management_contract_addr',
  LottoConfig: 'loto_config_contract_addr',
  SystemCost: 'system_cost_contract_addr',
  RandaoConfig: 'randao_config_contract_addr',
  RandaoFund: 'randao_fund_contract_addr',
  Randao: 'randao_contract_addr',
  onlyManagerMultiSig: 'manager_multisig_addr',
  onlyDirectorMultiSig: 'director_multisig_addr',
  onlyEscrowMultiSig: 'escrow_multisig_addr',
  QNTU: 'qntu_contract_addr'
};

const role = process.env.APP_WALLET_ROLE;
const roleDataMapping = {
  'cto': path.resolve(__dirname, 'data/Admin_Wallet - CTO.csv'),
  'director': path.resolve(__dirname, 'data/Admin_Wallet - Director.csv'),
  'operator': path.resolve(__dirname, 'data/Admin_Wallet - Operator.csv'),
  'manager': path.resolve(__dirname, 'data/Admin_Wallet - Manager.csv'),
  'operator1': path.resolve(__dirname, 'data/Randao_Wallet - Operator 1.csv'),
  'operator2': path.resolve(__dirname, 'data/Randao_Wallet - Operator 2.csv'),
  'bountyKeeper': path.resolve(__dirname, 'data/Randao_Wallet - Bounty Keeper.csv')
};

const iconMapping = {
  'cto': 'build/resources/cto.ico',
  'director': 'build/resources/director.ico',
  'operator': 'build/resources/operator.ico',
  'manager': 'build/resources/manager.ico',
  'operator1': 'build/resources/manager.ico',
  'operator2': 'build/resources/operator.ico',
  'bountyKeeper': 'build/resources/bountyKeeper.ico'
};

const iconLinuxMapping = {
  'cto': 'build/resources/cto',
  'director': 'build/resources/director',
  'operator': 'build/resources/operator',
  'manager': 'build/resources/manager',
  'operator1': 'build/resources/manager',
  'operator2': 'build/resources/operator',
  'bountyKeeper': 'build/resources/bountyKeeper'
};

const iconMacMapping = {
  'cto': 'build/resources/cto.icns',
  'director': 'build/resources/director.icns',
  'operator': 'build/resources/operator.icns',
  'manager': 'build/resources/manager.icns',
  'operator1': 'build/resources/manager.icns',
  'operator2': 'build/resources/operator.icns',
  'bountyKeeper': 'build/resources/bountyKeeper.icns'
};

const privacyMapping = {
  'director': 'https://quanta.im/download/QTL_Privacy_Policy.pdf',
  'manager': 'https://quanta.im/download/QTL_Privacy_Policy.pdf',
  'operator': 'https://quanta.im/download/QTL_Privacy_Policy.pdf',
  'cto': 'https://quanta.im/download/QTL_Privacy_Policy.pdf',
  'operator1': 'https://quanta.im/download/QTL_Privacy_Policy.pdf',
  'operator2': 'https://quanta.im/download/QTL_Privacy_Policy.pdf',
  'bountyKeeper': 'https://quanta.im/download/QTL_Privacy_Policy.pdf'
};

const procedureMapping = {
  'director': 'https://quanta.im/download/QTL_Director_Procedure.pdf',
  'manager': 'https://quanta.im/download/QTL_Manager_Procedure.pdf',
  'operator': 'https://quanta.im/download/QTL_Operator_Procedure.pdf',
  'cto': 'https://quanta.im/download/QTL_CTO_Procedure.pdf',
  'operator1': 'https://quanta.im/download/QTL_Manager_Procedure.pdf',
  'operator2': 'https://quanta.im/download/QTL_Operator_Procedure.pdf',
  'bountyKeeper': 'https://quanta.im/download/QTL_Bounty_Keeper_Procedure.pdf'
};

const nameMapping = {
  'director': 'Director Tool',
  'manager': 'Manager Tool',
  'operator': 'Operator',
  'cto': 'CTO Tool',
  'operator1': 'Randao Operator 1',
  'operator2': 'Randao Operator 2',
  'bountyKeeper': 'Bounty Keeper Tool'
};

const inputFile = roleDataMapping[role];

console.log('---------------------------------------------------------------------------');
console.log('Will compile data for: ', role);
console.log('---------------------------------------------------------------------------');

const outputFile = path.resolve(__dirname, '..', 'src/configs/menu.data.js');

const configExtOutputFile = path.resolve(__dirname, '..', 'src/configs/config.ext.json');

const appConfigOutputFile = path.resolve(__dirname, '..', 'src/configs/app.configs.js');

// --------------------------------------------------------------------
const getLabels = require(path.resolve(__dirname, '..', 'src/constants/role-label'));
const roleLabels = getLabels(role);
const configExt = Object.assign({
  version: (process.env.APP_VERSION || '1.0.0'),
  buildNumber: (process.env.APP_BUILD_NUMBER || '1'),
  game: process.env.APP_GAME,
  env: (process.env.APP_ENV || 'TEST_RPC'),
  walletRole: role,
  privacyUrl: privacyMapping[role],
  procedureUrl: procedureMapping[role],
  packageName: `${role}-tool`,
  productName: nameMapping[role],
}, roleLabels);

// config package.json file
const appPkgPath = path.resolve(__dirname, '..', 'package.json');
const pkgJson = require(appPkgPath);

pkgJson.version = configExt.version;
pkgJson.name = configExt.packageName;
pkgJson.productName = configExt.productName;
pkgJson.build.productName = configExt.productName;
pkgJson.build.appId = `org.develar.${configExt.packageName}`;

pkgJson.build.win.icon = iconMapping[role];
pkgJson.build.nsis.installerIcon = iconMapping[role];
pkgJson.build.nsis.installerHeaderIcon = iconMapping[role];

pkgJson.build.linux.icon = iconLinuxMapping[role];
pkgJson.build.mac.icon = iconMacMapping[role];

fs.writeFileSync(appPkgPath, JSON.stringify(pkgJson, null, 2));
console.log('Complete package.json');

fs.writeFileSync(configExtOutputFile, JSON.stringify(configExt, null, 2));
console.log('Complete src/configs/config.ext.json');

// config index.html file
const appTemplateInputFile = path.resolve(__dirname, '..', 'public', 'index.html.template');
const appTemplateOutputFile = path.resolve(__dirname, '..', 'public', 'index.html');
var appContent = fs.readFileSync(appTemplateInputFile, { encoding: 'utf-8' });
appContent = appContent.replace(/{app_title}/gi, configExt.productName);
fs.writeFileSync(appTemplateOutputFile, appContent, { encoding: 'utf-8' });
console.log('Complete src/app.html');

// config electron.js
const electronFileInput = path.resolve(__dirname, '..', 'src', 'electron.js.template');
const electronFileOutput = path.resolve(__dirname, '..', 'src', 'electron.js');
var electronText = fs.readFileSync(electronFileInput, {encoding: 'utf-8'})
electronText = electronText.replace(/{icon_template}/gi, `'../build/resources/${role}/64x64.png'`)
fs.writeFileSync(electronFileOutput, electronText, { encoding: 'utf-8' });
// --------------------------------------------------------------------

const arrData = [];
const objCatMapping = {};
const objCatFunMapping = {};

fs.createReadStream(inputFile, { encoding: 'utf8' }).pipe(csv.parse({ headers: true })).transform((row) => {
  //
  const contractAddress = getContractAddress(row.contract || '');
  const categoryName = (row.category || '');
  const catKey = removeSpaces(row.category || '');
  const functionName = removeSpaces(row.function || '');
  const catFunKey = `${catKey}_${functionName}_${contractAddress}`;
  //
  let param = null;
  const inputName = removeSpaces(row.input_name || '');
  const inputType = removeSpaces(row.input_type || '');
  if (inputName.length > 0 && inputName.length > 0) {
    const default_value = row.default_value ? getContractAddress(row.default_value) ? getContractAddress(row.default_value) : row.default_value : ''
    param = {
      name: inputName,
      type: inputType,
      label: row.input_label || '',
      description: row.input_description || '',
      convertConvention: row.convert_convention || '',
      readOnly: removeSpaces(row.read_only || '').toLowerCase() === 'yes',
      defaultValue: default_value,
    };
  }
  //
  let objCategory = {
    categoryName: categoryName,
    data: [],
  };
  if (typeof objCatMapping[catKey] === 'undefined') {
    arrData.push(objCategory);
    objCatMapping[catKey] = arrData.length - 1;
  }
  else {
    objCategory = arrData[objCatMapping[catKey]];
  }

  //
  let objFunction = {
    action: (removeSpaces(row.action || '')).replace(/\|/gi, ','),
    functionName: functionName,
    label: row.function_label || '',
    description: row.function_description || '',
    params: [],
    contractAddress: contractAddress,
    multisigAddress: getContractAddress(row.priviledge || ''),
    disable: removeSpaces(row.disable || '').toLowerCase() === 'yes',
    condition: row.condition,
    priviledge: row.priviledge
  };
  if (typeof objCatFunMapping[catFunKey] === 'undefined') {
    objCategory.data.push(objFunction);
    objCatFunMapping[catFunKey] = objCategory.data.length - 1;
  }
  else {
    objFunction = objCategory.data[objCatFunMapping[catFunKey]];
  }
  if (param) {
    objFunction.params.push(param);
  }
  // check to disable category if there is no enabled function in that category
  var totalDisableFuncs = 0;
  for (var idx = 0; idx < objCategory.data.length; idx++) {
    if (objCategory.data[idx].disable === true) {
      totalDisableFuncs++;
    }
  }
  objCategory.disable = (totalDisableFuncs === objCategory.data.length);
  //
}).on('data', (data) => { }).on('end', (numRows) => {
  const menuData = JSON.stringify(arrData);
  fs.writeFileSync(outputFile, `module.exports = ${menuData}`);
  console.log('Complete src/configs/menu.data.js');
  console.log('---------------------------------------------------------------------------');
  console.log('Compile data has done');
  console.log('---------------------------------------------------------------------------');
});

// --------------------------------------------------------------------
try {
const contractNames = Object.keys(mapping)
if (contractNames) {
  const datas = {}
  contractNames.forEach((name) => {
    appConfig.contracts[name] = getContractAddress(name)
  })
}
fs.writeFileSync(appConfigPath,`module.exports = ${JSON.stringify(appConfig)}`)
console.log('---------------------------------------------------------------------------');
console.log('Compile contract has done')
console.log('---------------------------------------------------------------------------');
} catch (err) {
  console.log('Compile contract with error: ' + err)
}