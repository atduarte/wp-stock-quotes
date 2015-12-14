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
      });
  }
};
