/**
* Stock.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var quote = require('../services/Quote');

module.exports = {
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    name: {
      type : 'string',
      required: true
    },
    upperLimit: {
      type : 'float'
    },
    lowerLimit: {
      type : 'float'
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.graph = quote.graph(obj.name);
      return obj;
    }
  }
};

