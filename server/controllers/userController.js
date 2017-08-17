'use strict'

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

var userLogin = (req,res) => {
  User.findOne({username: req.body.username}, (err,dataUser) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      // console.log(dataUser);
      if(!dataUser){
        console.log('login failed');
        res.send('user not Found');
      } else if(bcrypt.compareSync(req.body.password, dataUser.password)) {
        // console.log(dataUser.password);
        let token = jwt.sign({username: dataUser.username}, 'secret',{ expiresIn: '1h'});
        console.log(token);
        console.log('login success');
        res.send({token: token, user_id: dataUser._id, username: dataUser.username});
      } else {
        console.log('login failed');
        res.send('incorrect password')
      }
    }
  })
}

var createUser =(req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
    created_at: new Date()
  },(err,result) => {
    if (err) {
      console.log(err.message);
      res.send(err)
    }
    console.log(result);
    res.send(result)
  })
}

var getAllUser = (req,res) => {
  User.find({},(err,result) => {
    if (err) {
      console.log(err);
      res.send(err.message)
    }
    res.send(result)
    console.log(result);
  })
}

var updateUser = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  User.findById(req.params.id, (err,data) => {
    if (err) {
      console.log(err);
      res.send(err.message)
    }
    data.name = req.body.name || data.name;
    data.username = req.body.username || data.username;
    data.email = req.body.email || data.email;
    data.password = hash || data.password;
    data.updated_at = new Date();
    
    data.save((err,data) => {
      if (err) {
        res.send(err)
      }
      res.send(data)
      console.log('data already update');
    })
  })
}

var deleteUser = (req,res) => {
  User.findByIdAndRemove(req.params.id,(err) => {
    if (err) {
      res.send(err.message)
    }
    res.send('data already delete')
  })
}

var getOneUser = (req,res) => {
  User.findById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
      res.send(err.message)
    }
    res.send(data);
    console.log(data);
  })
}

module.exports = {
  userLogin,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getOneUser
}