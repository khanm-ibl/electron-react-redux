import WalletAccount from '../WalletAccount'

it('Create wallet account', () => {
  const account = new WalletAccount('123456789', '1000000', 'qwertyuiopasdfghjkl', 'keysorejsonstring', 'manager', false)
  expect(account.address).toBe('123456789')
  expect(account.balance).toBe('1000000')
  expect(account.role).toBe('manager')
});

it('Update wallet account', () => {
  const account = new WalletAccount('123456789', '1000000', 'qwertyuiopasdfghjkl', 'keysorejsonstring', 'manager', false)
  account.updateWalletAccount('1111111111')
  expect(account.address).toBe('1111111111')
});