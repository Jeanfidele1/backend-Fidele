const mongoose =require('mongoose');
// const { stringify } = require('querystring');
const usersCollectionSchema = new mongoose.Schema({
    names: {
        type: String, 
        required: true
    },
    email: {
       type: String,
       required: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true
    },
    date: {
       type: String,
       required: true
    }

})

const User = mongoose.model('User',usersCollectionSchema);
module.exports.User = User;
