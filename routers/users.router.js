const User = require('../modals/users.modal');
const express = require('express');
const router = express.Router();
const {createUser, login, getUsers, getUserById, updateUser} = 
require('../controllers/user.controller');

const {auth} = require('../middleware/auth');

router.post('/newUser',createUser);

router.post('/login', login);

router.get('/allUsers',getUsers);

router.get('/:userId', getUserById);

router.put('/udpateUser/:userId',[auth],updateUser)

//----------------- delete router
module.exports = router;