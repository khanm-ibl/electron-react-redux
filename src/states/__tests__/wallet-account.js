import { handler, actionCreators } from '../wallet-account'

it('Create action update wallet info', () => {
  const res = actionCreators.updateWalletInfo({address: '123'})
  expect(res.type).toBe('WALLET_ACCOUNT_UPDATE_WALLET_INFO')
});
