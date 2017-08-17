
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var threadSchema = new Schema({
  title: String,
  content: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  comment_id: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  username: String,
  upvote: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  created_at: Date,
  updated_at: Date
});

var Thread = mongoose.model('thread',threadSchema);

module.exports = Thread;