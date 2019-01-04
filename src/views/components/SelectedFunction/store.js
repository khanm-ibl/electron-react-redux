import { connect } from 'react-redux'
import { dispatchers, handlers } from '../../../states/wallet-account'

const mapStateToProps = state => ({
 
})

const mapDispatchToProps = dispatch => ({
  // Inject Redux actions as props
  actions: {
  },
  // Inject handler as props
  handlers: {
  }
})

export default comp =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(comp)
