'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  comment: String,
  thread_id: [{ type: Schema.Types.ObjectId, ref: 'thread' }],
  user_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  username: String,
  upvote: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  created_at: Date,
  updated_at: Date
});

var CommentThread = mongoose.model('comment',commentSchema);

module.exports = CommentThread;