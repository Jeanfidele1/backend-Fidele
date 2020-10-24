require('./modals/db');
const express = require('express');
const bodyParser = require('body-parser');
// const usersRouter =require('./routers/users.router');

const app = express();
app.use(bodyParser.json());


app.get('',(req,res)=>{
    res.send("Welcome to my app").status(200)
})

// app.use('/api/user',usersRouter)
const port = 5000;
app.listen(port,()=>{
    console.log("App connected" +port);
})

