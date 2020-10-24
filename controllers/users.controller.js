const {User} = require('../modals/users.modal');
const {hash} = require('../helper/hash');
const bcrypt = require('bcrypt');
const {signToken} = require('../helper/signToken');
const _ = require('lodash')
const {currentUser} = require('../helper/currentUser');
const { response } = require('express');

exports.createUser = async(req,res) => {
   const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = await hash(req.body.password);
        newUser.role = 'STANDARD_USER';
        newUser.date = new Date();

        newUser.save().then((user)=>{
            res.send(user).status(201);
        }).catch((error) => {
            res.send(error).status(400)
        }
        )
} 



exports.login = async(req,res)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user) return res.send({
        message:"Invalid email or password",
        status: 401,
    }).status(401)

   let validPassword = await bcrypt.compare(req.body.password,user.password)
     if(!validPassword){
        return res.send({
            message:"Invalid  email or password",
            status: 401,
        }).status(401)
     }

     return res.send({
         message: 'Login succesfull',
         status: 200,
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
         date: user.date,
         token: await signToken(user)
     })
}

exports.getUsers = async(req,res) => {
   await User.find().then((users) => {
       let allUser = [];
       users.forEach(user => {
          allUser.push(_.pick(user,['_id','name','email','role','date']))
       })

       res.send(allUser).status(200)
   })
   .catch((error)=>{
       res.send({
           message: 'Error occured',
           status: 400,
           error: error
       }).status(400)
   })
}

exports.getUserById =  async(req,res) => {
    let userId = req.params.userId;

    try{
      let user = await User.findOne({_id: userId});
      if(user){
          return res.send({
              success: true,
              status: 200,
              user: _.pick(user,['_id','name','email','role','date'])
          }).status(200)
      }
     
    }
    catch(error){
        return res.send({
            success:false,
            status: 404,
            message: 'user not found'
        }).status(404)
    }
 } 
