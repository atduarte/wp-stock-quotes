/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async'),
  Promise = require('bluebird'),
  quote = require('../services/Quote');

module.exports = {
  quotes: function (req, res) {
    sails.models.stock
      .find({user: req.param('uid')})
      .then(function(stocks) {
        return Promise.props(_(stocks)
          .map(function (stock) { return [stock.name, quote.fetch(stock.name)]; })
          .object()
          .value()
        );
      })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.badRequest(err);
      });
  }
};
