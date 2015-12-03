/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

var quote = require('../services/Quote');


module.exports = {
	quotes: function (req, res) {
    quote.fetch(req.query.symbol)
      .then(function(snapshot) { return res.send({result: snapshot}); })
      .catch(function(err) { return res.send({error: err}); });
  }
};

