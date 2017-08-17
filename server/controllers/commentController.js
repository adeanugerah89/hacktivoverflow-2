'use strict'

var CommentThread = require('../models/comment');
var Thread = require('../models/thread');
var User = require('../models/user');

var createComment = (req,res) => {
  CommentThread.create({
    comment: req.body.comment,
    thread_id: req.body.thread_id,
    user_id: req.body.user_id,
    username: req.body.username,
    upvote:[],
    downvote:[],
    created_at: new Date()
  },(err,comment) => {
    if (err) {
      console.log(err);
    }
    Thread.findById(req.body.thread_id,(err,thread) => {
      thread.comment_id.push(comment._id);
      thread.save(err => {
        if (err) {
          console.log(err);
          res.send(err);
        }
      })
    });
    User.findById(req.body.user_id,(err,user) => {
      user.comment_id.push(comment._id);
      user.save(err => {
        if (err) {
          console.log(err);
        }
      })
    })
    console.log(comment);
    res.send(comment)
  })
}

var getAllComment = (req,res) => {
  CommentThread.find().populate('thread_id')
  .exec((err,result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send(result);
  })
}

var updateComment = (req,res) => {
  CommentThread.findById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
      res.send(err.message)
    }
    data.comment = req.body.comment || data.comment;
    data.thread_id = req.body.thread_id || data.thread_id;
    data.user_id = req.body.user_id || data.user_id;
    data.username = req.body.username || data.username;
    data.upvote = [] || data.upvote;
    data.downvote = [] || data.downvote;
    data.updated_at = new Date();
    
    data.save((err,data) => {
      if (err) {
        res.send(err)
      }
      res.send(data);
      console.log('data already update');
    })
  })
}

var deleteComment = (req,res) => {
  CommentThread.findByIdAndRemove(req.params.id,(err) => {
    if (err) {
      console.log(err);
    }
    res.send('data already delete')
  })
}

var getOneComment = (req,res) => {
  CommentThread.findById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
    }
    res.send(data)
  })
}

var upVote = (req,res) => {
  CommentThread.findById(req.params.id, (err,data) => {
    if (req.body.user_id){
      console.log('data upvote'+data.upvote);
      console.log('data downvote'+data.downvote);
      var indexUp = data.upvote.indexOf(req.body.user_id)
      console.log(indexUp);
      var indexDown = data.downvote.indexOf(req.body.user_id)
      console.log(indexDown);
      if (indexUp == -1 && indexDown == -1) {
        data.upvote.push(req.body.user_id)
      }else if(indexDown !== -1){
        data.downvote.splice(indexDown,1)
      }
      
      data.save((err,result) => {
        if (err) res.send(err)
        res.send(result)
      })
    }
  })
}

var downVote = (req,res) => {
  CommentThread.findById(req.params.id, (err,data) => {
    if (req.body.user_id){
      var indexUp = data.upvote.indexOf(req.body.user_id)
      var indexDown = data.downvote.indexOf(req.body.user_id)
      if (indexUp == -1 && indexDown == -1) {
        data.downvote.push(req.body.user_id)
      }else if(indexDown !== null){
        data.upvote.splice(indexDown,1)
      }
      
      data.save((err,result) => {
        if (err) res.send(err)
        res.send(result)
      })
    }
  })
}

module.exports = {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
  getOneComment,
  upVote,
  downVote
}