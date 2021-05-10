export const endpoints = {
  _ver: process.env.VUE_APP_API_VER,
  _instruments: "instrument/active",
  _bucketed: "trade/bucketed",
  _orders: "order",
  _wallet: "user/walletSummary",
  get _path() {
    return "/api/" + this._ver;
  },
  get instruments() {
    return this._path + "/" + this._instruments;
  },
  get bucketed() {
    return this._path + "/" + this._bucketed;
  },
  get bucketedParams() {
    return {
      binSize: "1m",
      partial: false,
      count: 100,
      reverse: true,
      symbol: "XBTUSD",
    };
  },
  get orders() {
    return this._path + "/" + this._orders;
  },
  get wallet() {
    return this._path + "/" + this._wallet + "?currency=XBt";
  },
};
