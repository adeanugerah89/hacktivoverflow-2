'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  comment_id: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  thread_id: [{ type: Schema.Types.ObjectId, ref: 'thread' }],
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('user',userSchema);

module.exports = User;