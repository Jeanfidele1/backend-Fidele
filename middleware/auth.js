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

   let decode = jwt.decode(token,config.get('jwtPrivateKey'));
   if(!decode){
    return res.send({
        message:"Unauthorized",
        status: 401
    }).status(401)
   }
   next();
}
