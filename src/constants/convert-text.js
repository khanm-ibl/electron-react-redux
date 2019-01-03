export default class ConvertText {
  constructor () {
    this.constant = {
      moveAllFund: 'Move All Fund',
      stopLotteryInEmergency: 'Stop Lottery',
      StartSelling: 'Selling Started',
      CompleteSelling: 'Complete Selling',
      ResumeSelling: 'Resume Selling',
      PauseSelling: 'Pause Selling',
      FinishRound: 'Draw Finished',
      StopSellingInEmergency: 'Stop Selling In Emergency',
      CalculatingJackpot: 'Calculating Jackpot',
      CalculatedJackpot: 'CalculatedJackpot',
      CountingJackpotTickets: 'Counting Jackpot Tickets',
      CountedJackpotTickets: 'Counted Jackpot Tickets',
      CalculatePrizes: 'Prizes Calculated',
      FinishSelling: 'Selling Finished',
      CalculateTotalPrize: 'Calculating Total Prize',
      0: 'Jackpot',
      1: '1st',
      2: '2nd',
      3: '3rd',
      4: '4th',
      ToggleAllowInitRandaotrue: 'Allow Bounty Payout',
      ToggleAllowInitRandaofalse: 'Disallow Bounty Payout',
      ToggleAllowClaimPrizetrue: 'Allow Prize Payout',
      ToggleAllowClaimPrizefalse: 'Disallow Prize Payout',
      WithdrawFundFromMainLottery: 'Allow Withdraw Fund',
      CampaignInit: 'Campaign Init',
      CampaignStart: 'Campaign Start',
      StopSuccess: 'Stop Success',
      PayoutReward: 'Payout Reward',
      RewardCompleted: 'Reward Completed'
    }
  }

  convert (text, data = '') {
    return this.constant[`${text}${data}`] || text
  }
}
