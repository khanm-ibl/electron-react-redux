import { connect } from 'react-redux'
import { dispatchers, handlers } from '../../../states/wallet-account'

const mapStateToProps = state => ({
  // Just inject data which used in component
  walletInfo: state.walletInfo
})

const mapDispatchToProps = dispatch => ({
  // Inject Redux actions as props
  actions: {
    updateWalletInfo: walletInfo => dispatch(dispatchers.updateWalletInfo(walletInfo))
  },
  // Inject handler as props
  handlers: {
    checkRole: handlers.checkRole
  }
})

export default comp =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(comp)
