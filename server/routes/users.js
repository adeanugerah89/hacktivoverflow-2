'use strict'
const express = require('express');
const router = express.Router();
var controller = require('../controllers/userController')

/* GET users listing. */
router.post('/',controller.createUser);
router.post('/login',controller.userLogin);
router.get('/',controller.getAllUser);
router.put('/:id',controller.updateUser);
router.delete('/:id',controller.deleteUser);
router.get('/:id',controller.getOneUser);

module.exports = router;
