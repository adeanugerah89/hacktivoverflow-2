'use strict'

var Thread = require('../models/thread');
var User = require('../models/user');
var CommentThread = require('../models/comment');

var createThread = (req,res) => {
  Thread.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id,
    username: req.body.username,
    upvote:[],
    downvote:[],
    created_at: new Date()
  },(err,result) => {
    if (err) {
      console.log(err);
      res.send(err.message)
    }
    res.send(result)
    console.log(result);
  })
}

var getAllThread = (req,res) => {
  Thread.find().populate('comment_id')
  .exec((err,result) => {
    if (err) {
      console.log(err);
      res.send(err)
    }
    res.send(result)
  })
}

var updateThread = (req,res) => {
  Thread.findById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
      res.send(err)
    }
    data.title = req.body.title || data.title;
    data.content = req.body.content || data.content;
    data.user_id = req.body.user_id || data.user_id;
    data.username = req.body.username || data.username;
    data.upvote = [] || data.upvote;
    data.downvote = [] || data.downvote;
    data.update = new Date();
    
    data.save((err,data) => {
      if (err) {
        res.send(err)
      }
      res.send(data);
      console.log('data already update');
    })
  })
}

var deleteThread = (req,res) => {
  Thread.findByIdAndRemove(req.params.id,(err) => {
    if (err) {
      console.log(err);
    }
    res.send('data already delete')
  })
}

var getOneThread = (req,res) => {
  Thread.findById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
    }
    res.send(data)
  })
}

var upVote = (req,res) => {
  Thread.findById(req.params.id, (err,data) => {
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
  Thread.findById(req.params.id, (err,data) => {
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
  createThread,
  getAllThread,
  updateThread,
  deleteThread,
  getOneThread,
  upVote,
  downVote,
}
