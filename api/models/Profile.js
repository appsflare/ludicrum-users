/**
 * Profile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    type: {
      type: "string",
      required: true
    },
    name: {
      type: "string",
      required: "true"
    },
    photo: {
      type: 'string'
    },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'not specified'],
      defaultsTo: 'not specified'
    },
    sections: {
      type: 'array',
      required: true
    }
  }
};

