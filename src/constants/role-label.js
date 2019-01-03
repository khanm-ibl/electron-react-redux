/* eslint-disable */

const ROLE_MANAGER = 'manager'  // Do NOT change this
const ROLE_CTO = 'cto'  // Do NOT change this
const ROLE_DIRECTOR = 'director' // Do NOT change this
const ROLE_OPERATOR = 'operator'  // Do NOT change this
const ROLE_OPERATOR1 = 'randao-operator1'
const ROLE_OPERATOR2 = 'randao-operator2'
const ROLE_BOUNTY_KEEPER = 'randao-bounty-keeper'
const label = {}

// manager
label[ROLE_MANAGER] = {
    roleName: 'manager',
    branding: 'Manager Tool',
    appTitle: 'Manager Tool',
    packageName: 'manager-tool',   // use in package.json
    productName: 'Manager Tool'   // use in package.json
}

// director
label[ROLE_DIRECTOR] = {
    roleName: 'director',
    branding: 'Director Tool',
    appTitle: 'Director Tool',
    packageName: 'director-tool',   // use in package.json
    productName: 'Director Tool'   // use in package.json
}

// operator
label[ROLE_OPERATOR] = {
    roleName: 'operator',
    branding: 'Operator Tool',
    appTitle: 'Operator Tool',
    packageName: 'operator-tool',   // use in package.json
    productName: 'Operator Tool'   // use in package.json
}

// randao operator 1
label[ROLE_OPERATOR1] = {
    roleName: 'operator1',
    branding: 'Randao Operator 1',
    appTitle: 'Randao Operator 1 Tool',
    packageName: 'operator1-tool',   // use in package.json
    productName: 'Operator1 Tool'   // use in package.json
}

// randao operator 2
label[ROLE_OPERATOR2] = {
    roleName: 'operator2',
    branding: 'Randao Operator 2',
    appTitle: 'Randao Operator 2 Tool',
    packageName: 'operator2-tool',   // use in package.json
    productName: 'Operator2 Tool'  // use in package.json
}

// bounty keeper 2
label[ROLE_BOUNTY_KEEPER] = {
    roleName: 'bountyKeeper',
    branding: 'Bounty Keeper',
    appTitle: 'Bounty Keeper Tool',
    packageName: 'bounty-keeper-tool',   // use in package.json
    productName: 'Bounty Keeper Tool'  // use in package.json
}

function getLabels(walletRole) {
    return label[walletRole]
}

module.exports = getLabels
