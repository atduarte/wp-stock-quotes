var yahoo = require('yahoo-finance'),
  moment = require('moment'),
  promise = require('bluebird');

module.exports = {
  fetch: function (symbol) {

    return yahoo.historical({
        symbol: symbol,
        to: moment().format("YYYY-MM-DD"),
        from: moment().subtract(30, 'days').format("YYYY-MM-DD"),
        period: 'd'
      })
      .then(function (snapshot) {
        return _.map(snapshot, function (item) { return item.close; });
      });
  },

  graph: function (symbol) {
    return 'http://chart.finance.yahoo.com/z?t=30d&s=' + symbol;
  }
};
