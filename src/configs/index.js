import exchangeRate from './constants/exchangeRate.config'
import price from './constants/price.config'
import feeRate from './constants/feeRate.config'
import appConfigs from './app.configs'
import ServerConfigs from './server.configs'
import menuData from './menu.data'

const extConfig = require('./config.ext')

const env = extConfig.env

const serverConfigs = new ServerConfigs(env)

const config = {
  version: extConfig.version,
  buildNumber: extConfig.buildNumber,
  env,
  tesnet: false,
  appConfigs,
  serverConfigs,
  exchangeRate,
  price,
  feeRate,
  remoteSetting: {},
  menuData,
  ext: extConfig
}

export const TIMEOUT = 60000

export default config
