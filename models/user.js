const mongoose = require('mongoose');
// core node module that has a password
const crypto = require('crypto');
// generate unique strings
const uuidv = require('uuid/v1');

const userSchema = new mongoose.Schema({
  name: {
    typr: String,
    trim: true, // any space in the beginning or end will be trimmed
    required: true,
    maxLength: 32
  },
  email: {
    typr: String,
    trim: true, 
    required: true,
    unique: 32
  },
  hashed_password: {
    typr: String,
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
{timestamps : true}
);

