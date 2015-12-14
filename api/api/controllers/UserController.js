/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async'),
  Promise = require('bluebird'),
  quote = require('../services/Quote'),
  createAction = require('sails/lib/hooks/blueprints/actions/create');

module.exports = {
  create: function (req, res) {
    sails.models.user
      .findOne({id: req.param('id')})
      .then(function (user) {
        if (user) return res.send(user);
        createAction(req, res);
      })
      .catch(function (err) {
        return res.badRequest(err);
      })
  },
  quotes: function (req, res) {
    sails.models.stock
      .find({"user.id": req.param('id')})
      .then(function (stocks) {
        return res.send(_.map(stocks, function (stock) {
          stock.graph = quote.graph(stock.name);
          return _.pick(stock, ['name', 'upperLimit', 'lowerLimit', 'graph']);
        }));
      })
      .catch(function (err) {
        return res.badRequest(err);
      });
  }
};
