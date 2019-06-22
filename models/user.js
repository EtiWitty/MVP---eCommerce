const mongoose = require('mongoose');
// core node module that has a password
const crypto = require('crypto');
// generate unique strings
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // any space in the beginning or end will be trimmed
    trim: true, 
    required: true,
    maxLength: 32
  },
  email: {
    type: String,
    trim: true, 
    required: true,
    unique: 32
  },
  hashed_password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    trim: true
  },
  salt: String,
  role: {
    type: Number,
    // 0 always means user, and 1 means admin
    default: 0
  },
  // when users parse from our online shop, then the history will be stored in this property
  history: {
    type: Array,
    default: []
  }
}, 
  { timestamps : true }
);


// virtual field
userSchema.virtual('password') 
.set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  })

  userSchema.methods = {
    encryptPassword: function(password) {
      if(!password) return '';
      // the documentation is in node js
      try {
        return crypto.createHmac('sha1', this.salt)
                      .update(password)
                      .digest('hex')
      } catch (err) {
        return ''
      }
    }
  };

  module.exports = mongoose.model('User', userSchema);
