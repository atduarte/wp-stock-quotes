/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    uid: {
      type: 'string',
      primaryKey: true,
      unique: true,
      required: true
    },
    stocks: {
      via: 'user',
      collection: 'Stock'
    }
  }

};

