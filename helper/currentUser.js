const  config = require('config');
const jwt = require('jsonwebtoken');

exports.currentUser = (req,res,next) => {
   const token =  req.header('Bearer');
   if(!token) {
       return res.send({
           message:"Unauthorized",
           status: 401
       }).status(401)
   }

   let user = jwt.decode(token,config.get('jwtPrivateKey'));
   if(!user){
    return res.send({
        message:"Unauthorized",
        status: 401
    }).status(401)
   }

   return user;
}
