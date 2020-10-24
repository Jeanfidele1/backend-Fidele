const  config = require('config');
const jwt = require('jsonwebtoken');

exports.auth = (req,res,next) => {
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
   
   if(user.role != 'ADMIN'){
    return res.send({
        message:"Unauthorized",
        status: 401
    }).status(401)
   }

   next();
}
