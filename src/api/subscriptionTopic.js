export const subscriptionTopic = [
  { topic: "announcement", auth: false }, // Site announcements
  { topic: "chat", auth: false }, // Trollbox chat
  { topic: "connected", auth: false }, // Statistics of connected users/bots
  { topic: "funding", auth: false }, // Updates of swap funding rates. Sent every funding interval (usually 8hrs)
  { topic: "instrument", auth: false }, // Instrument updates including turnover and bid/ask
  { topic: "insurance", auth: false }, // Daily Insurance Fund updates
  { topic: "liquidation", auth: false }, // Liquidation orders as they're entered into the book
  { topic: "orderBookL2_25", auth: false }, // Top 25 levels of level 2 order book
  { topic: "orderBookL2", auth: false }, // Full level 2 order book
  { topic: "orderBook10", auth: false }, // Top 10 levels using traditional full book push
  { topic: "publicNotifications", auth: false }, // System-wide notifications (used for short-lived messages)
  { topic: "quote", auth: false }, // Top level of the book
  { topic: "quoteBin1m", auth: false }, // 1-minute quote bins
  { topic: "quoteBin5m", auth: false }, // 5-minute quote bins
  { topic: "quoteBin1h", auth: false }, // 1-hour quote bins
  { topic: "quoteBin1d", auth: false }, // 1-day quote bins
  { topic: "settlement", auth: false }, // Settlements
  { topic: "trade", auth: false }, // Live trades
  { topic: "tradeBin1m", auth: false }, // 1-minute trade bins
  { topic: "tradeBin5m", auth: false }, // 5-minute trade bins
  { topic: "tradeBin1h", auth: false }, // 1-hour trade bins
  { topic: "tradeBin1d", auth: false }, // 1-day trade bins
  { topic: "affiliate", auth: true }, // Affiliate status, such as total referred users & payout %
  { topic: "execution", auth: true }, // Individual executions; can be multiple per order
  { topic: "order", auth: true }, // Live updates on your orders
  { topic: "margin", auth: true }, // Updates on your current account balance and margin requirements
  { topic: "position", auth: true }, // Updates on your positions
  { topic: "privateNotifications", auth: true }, // Individual notifications - currently not used
  { topic: "transact", auth: true }, // Deposit/Withdrawal updates
  { topic: "wallet", auth: true }, // Bitcoin address balance data, including total deposits & withdrawals
];
