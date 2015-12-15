var quote = require('../api/services/Quote'),
  wns = require('wns'),
  http = require('http'),
  url = require('url');

var sendPush = function (urlPath, message) {
  //urlPath = url.parse(urlPath);

  wns.sendToastText01(urlPath, message, {
    client_id: 'ms-app://S-1-15-2-1103054980-4181359820-1462783700-1197856228-4263398619-2624448765-1742964821',
    client_secret: '3fbpyX6fct5BKy6E7aDUhO3Vkj7lKnzp'
  }, function (error, result) {
    if (error)
      console.error(error);
    else
      console.log(result);
  });
};

module.exports = {
  send: function () {
    sails.models.stock
      .find()
      .populate(['user'])
      .then(function (stocks) {
        _.map(stocks, function (stock) {
          if (!stock.lowerLimit && !stock.upperLimit) return;

          quote.fetch(stock.name)
            .then(function (result) {
              result = _.last(result);
              if (stock.lowerLimit && stock.lowerLimit >= result) {
                console.log('LOWER');
                sendPush(stock.user.uid, stock.name + ' upper limit hit!');
              }

              if (stock.upperLimit && stock.upperLimit <= result) {
                console.log('UPPER');
                sendPush(stock.user.uid, stock.name + ' lower limit hit!');
              }
            });
        });
      })
      .catch(function (err) { console.log('Cron Push: ' + err); });
  }
};
