/**
 * User
 *
 * @description :: A model for persisting user entity information.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true
    },
    hashedPassword: {
      type: 'string'
    },
    // Override toJSON method to remove password from API
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (values, next) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return next(err);
      values.hashedPassword = hash;
      delete values.password;
      next();
    });
  }

};
