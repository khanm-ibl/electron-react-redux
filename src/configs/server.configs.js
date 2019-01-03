const extConfig = require('./config.ext')

export const TEST_RPC = 'TEST_RPC'
export const DEV_COMMERCIAL = 'DEV_COMMERCIAL'

export default class ServerConfigs {
  constructor (env) {
    this.servers = {}
    this.ethereumUrl = {}
    this.affiliatesUrl = {}
    this.withdrawalUrl = {}
    this.commonUrl = {}
    this.exportSellingUrl = {}
    this.setEnv(env)
  }

  setEnv (env) {
    this.env = env
    this.setupServerConfigs()
  }

  setupServerConfigs () {
    switch (this.env) {
      case TEST_RPC:
        this.servers = {
          apiCommonUrl: 'http://localhost:7001/api?',
          commonSocketUrl: 'http://localhost:4000',
          apiGamesUrl: 'http://localhost:7002/api?',
          gamesSocketUrl: 'http://localhost:8000'
        }
        break
      case DEV_COMMERCIAL:
        this.servers = {
          apiCommonUrl: 'https://qtl-dev-common-api.quanta.im/api?',
          commonSocketUrl: 'https://qtl-dev-common-socket.quanta.im',
          apiGamesUrl: 'https://qtl-dev-games-api.quanta.im/api?',
          gamesSocketUrl: 'https://qtl-dev-games-socket.quanta.im'
        }
        break
      default:
        this.servers = {
          insightServer: 'http://localhost:5000',
          apiGamesUrl: 'http://localhost:7002/api?',
          apiCommonUrl: 'http://localhost:7001/api?',
          commonSocketUrl: 'http://localhost:4000',
          gamesSocketUrl: 'http://localhost:8000'
        }
    }

    this.setupUrlConfigs()
  }

  setupUrlConfigs () {
    this.urlProcedure = extConfig.procedureUrl
    this.urlPrivacy = extConfig.privacyUrl

    this.commonUrl = {
      httpLog: `${this.servers.apiCommonUrl}module=logs&action=getLogs`,
      getRemoteSetting: 'https://quantagame.firebaseio.com/setting.json',
      getExchangeRate: 'http://blocktest.altaapps.io/api/get_exchange_rate',
      getPrice: 'http://blocktest.altaapps.io/api/get_price',
      getGasPrice: `${this.servers.apiCommonUrl}module=proxy&action=eth_gasPrice`,
      getBalanceUrl: `${this.servers.apiCommonUrl}module=account&action=balance`,
      getTransactionsUrl: `${this.servers.apiCommonUrl}module=account&action=txlist`,
      getTransactionCount: `${this.servers.apiCommonUrl}module=proxy&action=eth_getTransactionCount`,
      sendRawTransactionUrl: this.servers.apiCommonUrl,
      getCurrentBlock: `${this.servers.apiCommonUrl}module=proxy&action=eth_blockNumber`,
      checkSmartContractUrl: this.servers.apiCommonUrl,
      getTransactionByHash: `${this.servers.apiCommonUrl}module=proxy&action=eth_getTransactionByHash`,
      getContractPublicInfoUrl: `${this.servers.apiCommonUrl}module=proxy&action=eth_call&tag=latest`
    }
    this.gameUrl = {
      login: this.servers.apiGamesUrl,
      getHistory: this.servers.apiGamesUrl,
      getCurrentLotteryConfig: `${this.servers.apiGamesUrl}module=config&action=info`,
      getCurrentLotteryInfo: `${this.servers.apiGamesUrl}module=draw&action=info`,
      getRandaoStatus: `${this.servers.apiGamesUrl}module=randao&action=status`,
      getLatestCampaign: `${this.servers.apiGamesUrl}module=randao&action=info`,
      getRandaoInfo: `${this.servers.apiGamesUrl}module=randao&action=info`,
      getLottoMilestone: `${this.servers.apiGamesUrl}module=draw&action=milestone`
    }
    this.multisig = {
      getPendingTxs: `${this.servers.apiGamesUrl}module=multisig&action=getTxs`,
      getPendingAllTxs: `${this.servers.apiGamesUrl}module=multisig&action=getAllTxs`
    }
    this.ethereumUrl = {
      viewTxDetailsUrl: 'https://rinkeby.etherscan.io/tx/{txHash}'
    }
  }
}
